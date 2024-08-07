import { useRef, useState } from 'react';
import { InfoWindow, Map } from 'react-bmapgl';
import { styleJson2 } from './data';
interface WindowProps {
    BMapGL?: any; // 如果知道更准确的类型，可以替代 any
}
const HomePage = () => {
    const mapRef = useRef(null);
    const BMapGL = (window as WindowProps)?.BMapGL;
    const [data, setData] = useState<{ lng?: number; lat?: number }>({});
    const [weatherData, setWeatherData] = useState<{
        city?: string;
        weather?: string;
    }>({});
    const getWeather = (location: string, city: string) => {
        fetch(
            `https://devapi.qweather.com/v7/weather/7d?location=${location}&key=d39fc1bd53194ffe99b03a3685be5d9b`,
        )
            .then((response) => response.json())
            .then((data: { daily: [] }) => {
                console.log(data);
                let weather = '';
                data?.daily?.forEach((item: any) => {
                    weather +=
                        '<div style="margin-bottom: 10px;">' +
                        '<span style="margin-right: 10px; margin-bottom: 10px;">' +
                        item.fxDate?.substring(5) +
                        '</span>' +
                        '<span style="margin-right: 10px;">' +
                        item.textDay +
                        '</span>' +
                        '<span>' +
                        '温度:' +
                        item.tempMin +
                        '~' +
                        item.tempMax +
                        '</span>' +
                        '</div>';
                });

                setWeatherData({ city, weather: weather });
                mapRef.current?.map?.openInfoWindow();
            });
    };
    const getCity = (
        address: {
            city: string;
            district: string;
            province: string;
        },
        location?: string,
    ) => {
        console.log(location);
        fetch(
            `https://geoapi.qweather.com/v2/city/lookup?location=${address?.city}&adm=${address?.province}&key=d39fc1bd53194ffe99b03a3685be5d9b`,
        )
            .then((response) => response.json())
            .then((res) => {
                if (res.code === '200') {
                    console.log(res);

                    getWeather(
                        res?.location?.[0]?.id,
                        address.province + address.city,
                    );
                }
            });
        return;
    };
    return (
        <div>
            <Map
                ref={mapRef}
                style={{ height: '100vh', width: '100%' }}
                center={new BMapGL.Point(116.404, 39.915)}
                zoom={6}
                maxZoom={10}
                heading={0}
                tilt={40}
                onClick={(e: any) => {
                    console.log(e);
                    const point = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
                    setData({ lng: e.latlng.lng, lat: e.latlng.lat });
                    const gc = new BMapGL.Geocoder();
                    gc.getLocation(
                        point,
                        function (rs: {
                            addressComponents: {
                                province: any;
                                city: any;
                                district: any;
                            };
                        }) {
                            getCity(rs.addressComponents);
                        },
                    );
                }}
                enableScrollWheelZoom
                enableDragging
                mapStyleV2={{ styleJson: styleJson2 }}
            >
                {/* <Marker position={{ lng: 116.402544, lat: 39.928216 }} /> */}
                {/* <NavigationControl /> */}
                {data.lng && weatherData.weather && (
                    <InfoWindow
                        position={new BMapGL.Point(data.lng, data.lat)}
                        title={weatherData?.city}
                        text={weatherData?.weather}
                        onClickclose={(e: Event) => {
                            console.log(e);
                        }}
                    />
                )}
            </Map>
        </div>
    );
};
export default HomePage;

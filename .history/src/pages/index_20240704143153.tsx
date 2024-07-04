import { useRef, useState } from 'react';
import { InfoWindow, Map } from 'react-bmapgl';
import { styleJson2 } from './data';
interface WindowProps {
    BMapGL?: any; // 如果知道更准确的类型，可以替代 any
}
export default function HomePage() {
    const mapRef = useRef(null);
    const BMapGL = (window as WindowProps)?.BMapGL;
    const [data, setData] = useState<{ lng: number; lat: number }>({
        lng: 116.404,
        lat: 39.915,
    });
    console.log(mapRef);
    const getCity = (location: string) => {
        fetch(
            `https://api.qweather.com/v7/weather/7d?location=${location}&key=d39fc1bd53194ffe99b03a3685be5d9b`,
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };
    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <Map
                ref={mapRef}
                style={{ height: '100vh', width: '100%' }}
                center={new BMapGL.Point(116.404, 39.915)}
                zoom={5}
                maxZoom={6}
                heading={0}
                tilt={40}
                onClick={(e: any) => {
                    console.log(e);
                    const point = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
                    setData({ lng: e.latlng.lng, lat: e.latlng.lat });

                    const gc = new BMapGL.Geocoder();
                    gc.getLocation(point, function (rs) {
                        console.log(point, rs);

                        const opts = {
                            title: '行政区划归属',
                            width: 220,
                            height: 92,
                        };
                        const infoStr =
                            '<div>省：' +
                            rs.addressComponents.province +
                            '</div>' +
                            '<div>市：' +
                            rs.addressComponents.city +
                            '</div>' +
                            '<div>区：' +
                            rs.addressComponents.district +
                            '</div>';

                        mapRef.current?.map.openInfoWindow();
                    });
                }}
                enableScrollWheelZoom
                enableDragging
                mapStyleV2={{ styleJson: styleJson2 }}
            >
                {/* <Marker position={{ lng: 116.402544, lat: 39.928216 }} /> */}
                {/* <NavigationControl /> */}
                <InfoWindow
                    position={new BMapGL.Point(data.lng, data.lat)}
                    title="标题"
                    text="快速文本信息窗口"
                    onClickclose={(e: Event) => {
                        console.log(e);
                    }}
                />
            </Map>
        </div>
    );
}

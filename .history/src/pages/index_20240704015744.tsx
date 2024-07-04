import { useRef } from 'react';
import { Map } from 'react-bmapgl';
import { styleJson2 } from './data';

export default function HomePage() {
    const mapRef = useRef(null);
    // useEffect(() => {
    //     if (mapRef.current) {
    //         console.log(mapRef);

    //         const dist = new BMapGL.DistrictLayer({
    //             name: '(山东省)',
    //             kind: 0,
    //             fillColor: '#618bf8',
    //             strokeColor: '#daeafa',
    //             viewport: true,
    //         });
    //         mapRef.current?.addDistrictLayer(dist);
    //     }
    // }, [mapRef]);
    console.log(mapRef);
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
                    const gc = new BMapGL.Geocoder();
                    gc.getLocation(point, function (rs) {
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
                        const infoWindow = new BMapGL.InfoWindow(infoStr, opts);
                        Map.openInfoWindow(infoWindow, point);
                    });
                }}
                enableScrollWheelZoom
                enableDragging
                mapStyleV2={{ styleJson: styleJson2 } as BMapGL.MapStyleV2}
            >
                {/* <Marker position={{ lng: 116.402544, lat: 39.928216 }} /> */}
                {/* <NavigationControl /> */}
                {/* <InfoWindow
                    position={new BMapGL.Point(116.4, 39.91)}
                    title="标题"
                    text="快速文本信息窗口"
                    onClickclose={(e: Event) => {
                        console.log(e);
                    }}
                /> */}
            </Map>
        </div>
    );
}

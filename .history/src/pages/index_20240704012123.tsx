import { useRef } from 'react';
import { Map } from 'react-bmapgl';
import { styleJson2 } from './data';

export default function HomePage() {
    const mapRef = useRef(null);
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
                onClick={(e: any) => {}}
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
                    onClickclose={(e) => {
                        console.log(e);
                    }}
                /> */}
            </Map>
        </div>
    );
}

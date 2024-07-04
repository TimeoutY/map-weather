import { InfoWindow, Map } from 'react-bmapgl';
import { styleJson2 } from './data';

export default function HomePage() {
    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <Map
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
                <InfoWindow
                    position={{ lng: 116.402544, lat: 39.928216 }}
                    text="内容"
                    title="标题"
                />
            </Map>
        </div>
    );
}
function dynamic(arg0: Promise<any>) {
    throw new Error('Function not implemented.');
}

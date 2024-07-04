import { useRef } from 'react';
import { styleJson2 } from './data';

export default function HomePage() {
    const mapRef = useRef(null);
    const map = new BMapGL.Map('container', {
        style: {
            styleJson: styleJson2,
        },
    });
    console.log(mapRef);
    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <div
                id="container"
                style={{ height: '100vh', width: '100%' }}
            ></div>
        </div>
    );
}
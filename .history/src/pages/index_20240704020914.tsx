import { useEffect } from 'react';

const map = new BMapGL.Map('container', {
    // style: {
    //     styleJson: styleJson2,
    // },
});
export default function HomePage() {
    useEffect(() => {
        map.centerAndZoom(new BMapGL.Point(116.404, 39.925), 6);
    }, []);
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

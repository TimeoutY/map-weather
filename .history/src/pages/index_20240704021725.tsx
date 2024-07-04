import { useEffect } from 'react';
import { styleJson2 } from './data';

export default function HomePage() {
    useEffect(() => {
        const BMapGL = window['BMapGL'];
        // console.log(BMapGL);
        // 创建地图实例
        const map = new BMapGL.Map('container', {
            style: {
                styleJson: styleJson2,
            },
        });
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 6);

        var marker = new BMapGL.Marker(new BMapGL.Point(116.404, 39.915));
        map.addOverlay(marker);
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

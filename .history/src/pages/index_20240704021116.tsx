import { useEffect } from 'react';

export default function HomePage() {
    useEffect(() => {
        const BMapGL = window.BMapGL;
        // console.log(BMapGL);
        // 创建地图实例
        var map = new BMapGL.Map('container');
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 6);
        // 添加控件和标注
        map.addControl(new BMapGL.NavigationControl());
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

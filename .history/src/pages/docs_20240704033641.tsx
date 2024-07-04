import { useEffect } from 'react';
import { styleJson2 } from './data';

interface WindowProps {
    BMapGL?: any; // 如果知道更准确的类型，可以替代 any
}

export default function DocsPage() {
    useEffect(() => {
        const BMapGL = (window as WindowProps)?.BMapGL;
        // console.log(BMapGL);
        // 创建地图实例
        const map = new BMapGL.Map('container', {
            style: {
                styleJson: styleJson2,
            },
            minZoom: 6,
            maxZoom: 10,
        });

        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 6);

        // const dist = new BMapGL.DistrictLayer({
        //     name: province,
        //     kind: 0,
        //     fillColor: '#618bf8',
        //     fillOpacity: 1,
        //     strokeColor: '#daeafa',
        //     viewport: true,
        // });
        // map.addDistrictLayer(dist);
        // --- 行政区划添加鼠标事件 ---
        map.addEventListener(
            'click',
            (e: { latlng: { lng: any; lat: any } }) => {
                console.log(123, e);
                const point = new BMapGL.Point(e.latlng.lng, e.latlng.lat);
                const gc = new BMapGL.Geocoder();
                gc.getLocation(
                    point,
                    function (rs: {
                        addressComponents: {
                            province: string;
                            city: string;
                            district: string;
                        };
                    }) {
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
                        map.openInfoWindow(infoWindow, point);
                    },
                );
                // e.currentTarget.setFillColor('#9169db');
            },
        );
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

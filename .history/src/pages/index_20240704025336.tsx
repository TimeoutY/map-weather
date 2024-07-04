import { useEffect } from 'react';
import { styleJson2 } from './data';

interface WindowProps {
    BMapGL?: any; // 如果知道更准确的类型，可以替代 any
}
const province = [
    '北京市',
    '天津市',
    '上海市',
    '重庆市', // 直辖市
    '河北省',
    '山西省',
    '辽宁省',
    '吉林省',
    '黑龙江省',
    '江苏省',
    '浙江省',
    '安徽省',
    '福建省',
    '江西省',
    '山东省',
    '河南省',
    '湖北省',
    '湖南省',
    '广东省',
    '海南省', // 省份
    '四川省',
    '贵州省',
    '云南省',
    '陕西省',
    '甘肃省',
    '青海省', // 省份
    // '内蒙古自治区',
    // '广西壮族自治区',
    // '西藏自治区',
    // '宁夏回族自治区',
    // '新疆维吾尔自治区', // 自治区
    // '香港特别行政区',
    // '澳门特别行政区', // 特别行政区
];
export default function HomePage() {
    useEffect(() => {
        const BMapGL = (window as WindowProps)?.BMapGL;
        // console.log(BMapGL);
        // 创建地图实例
        const map = new BMapGL.Map('container', {
            style: {
                styleJson: styleJson2,
            },
            minZoom: 6,
            maxZoom: 6,
        });

        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 6);

        const setDistrictLayer = (name: string) => {};
        const dist = new BMapGL.DistrictLayer({
            name: province,
            kind: 0,
            fillColor: '#618bf8',
            fillOpacity: 1,
            strokeColor: '#daeafa',
            viewport: true,
        });
        map.addDistrictLayer(dist);
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
                        setDistrictLayer(rs.addressComponents.province);
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

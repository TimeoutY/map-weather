import { useEffect } from 'react';

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
    '内蒙古自治区',
    '广西壮族自治区',
    '西藏自治区',
    '宁夏回族自治区',
    '新疆维吾尔自治区', // 自治区
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
                // styleJson: styleJson2,
            },
            minZoom: 6,
            maxZoom: 6,
        });

        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 6);

        const setDistrictLayer = (name: string) => {};
        fetch('https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                // 假设有一个颜色分配逻辑或数据源，这里简化为按索引分配颜色作为示例
                const colors = [
                    '#FF0000',
                    '#00FF00',
                    '#0000FF',
                    '#FFFF00',
                    '#FF00FF',
                ]; // 示例颜色数组

                data.features.forEach((provinceFeature, index) => {
                    // 确保颜色数组的索引不超出范围，简化处理
                    const colorIndex = index % colors.length;
                    const provinceName = provinceFeature.properties.name;
                    console.log(provinceName);

                    const polygon = new BMapGL.Polygon(
                        provinceFeature.geometry.coordinates,
                        {
                            strokeColor: '#555555', // 边界颜色
                            fillColor: colors[colorIndex], // 根据省份索引分配颜色
                            strokeWeight: 1, // 边界宽度
                            strokeOpacity: 1, // 边界透明度
                            fillOpacity: 0.6, // 填充透明度
                        },
                    );

                    // 添加到地图
                    map.addOverlay(polygon);

                    // 可选：添加鼠标交互事件
                    polygon.addEventListener('mouseover', function () {
                        map.setFillOpacity(0.8); // 高亮时增加填充透明度
                    });

                    polygon.addEventListener('mouseout', function () {
                        map.setFillOpacity(0.6); // 鼠标离开后恢复原填充透明度
                    });
                });
            })
            .catch((error) => {
                console.error('Error loading GeoJSON data:', error);
            });
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

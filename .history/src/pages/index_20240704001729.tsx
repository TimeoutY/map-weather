import yayJpg from '../assets/yay.jpg';

import {Map} from 'react-bmapgl';
export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <div id="mapContainer" className="ditusdf">
        <Map
          style={{ height: '100%', width: '100%' }}
          center={new BMapGL.Point(116.331398, 39.897445)}
          zoom={12}
          heading={0}
          tilt={40}
          onClick={(e: any) => dangqainweizhi()}
          enableScrollWheelZoom
          enableDragging
        >
          <CityListControl />
          <ScaleControl />
          <ZoomControl />
        </Map>
      </div>

    </div>
  );
}

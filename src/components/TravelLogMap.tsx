import { useState } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import Link from 'next/link';
import MapPin from './MapPin';
import PopupInfo from './PopupInfo';

interface Props {
  logs: TravelLogTypeWithId[];
}

export default function TravelLogMap({ logs }: Props) {
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);
  const lastLog = logs[logs.length - 1];

  return (
    <Map
      initialViewState={{
        longitude: lastLog?.longitude,
        latitude: lastLog?.latitude,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      style={{ width: '100vw', height: '100vh' }}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {logs.map((log) => (
        <Marker
          key={`marker-${log._id}`}
          longitude={log.longitude}
          latitude={log.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(log);
          }}
          style={{ cursor: 'pointer' }}
        >
          <MapPin />
        </Marker>
      ))}
      {popupInfo && (
        <Popup
          maxWidth="300px"
          style={{ color: 'black' }}
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <PopupInfo popupInfo={popupInfo} />
        </Popup>
      )}
      <Link
        href="/newlog"
        className="btn btn-info fixed top-2 right-2 m-3 z-999"
      >
        + New Log
      </Link>
    </Map>
  );
}

// https://stackoverflow.com/questions/45079029/react-fitbounds-issue-when-passing-array-of-longlat-react-mapbox-gl
// https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md
// https://stackoverflow.com/questions/68666400/fit-all-coordinates-into-the-bounds-of-the-map-react-in-mapbox
// https://dev.to/ivanbtrujillo/fit-viewport-to-markers-using-react-map-gl-3ig1

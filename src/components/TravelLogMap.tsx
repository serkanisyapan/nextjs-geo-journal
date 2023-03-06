import { useContext, useState } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import TravelLogContext from '@/context/TravelLogContext';
import MapPin from './MapPin';
import PopupInfo from './PopupInfo';

interface Props {
  logs: TravelLogTypeWithId[];
}

export default function TravelLogMap({ logs }: Props) {
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);
  const { newLogMarker, setNewLogMarker, setSidebarVisible } =
    useContext(TravelLogContext);
  const lastLog = logs[logs.length - 1];

  return (
    <Map
      initialViewState={{
        longitude: lastLog?.longitude,
        latitude: lastLog?.latitude,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      style={{ width: '100vw', height: '100vh' }}
      onClick={(event) => {
        setNewLogMarker(event.lngLat);
        setSidebarVisible(true);
      }}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {newLogMarker && (
        <Marker longitude={newLogMarker.lng} latitude={newLogMarker.lat}>
          <MapPin />
        </Marker>
      )}
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
    </Map>
  );
}

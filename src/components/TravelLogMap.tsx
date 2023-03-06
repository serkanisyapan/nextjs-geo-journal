import { useContext, useState, useRef } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  MarkerDragEvent,
  MapRef,
} from 'react-map-gl';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import TravelLogContext from '@/context/TravelLogContext';
import MapPin from './MapPin';
import PopupInfo from './PopupInfo';

interface Props {
  logs: TravelLogTypeWithId[];
}

const ANKARA_COORDINATES = {
  latitude: 39.944235279643806,
  longitude: 32.84854923915691,
};

export default function TravelLogMap({ logs }: Props) {
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);
  const { newLogMarker, setNewLogMarker, setSidebarVisible } =
    useContext(TravelLogContext);
  const mapRef = useRef<MapRef>(null);
  const lastLog = logs[logs.length - 1];

  function handleDragEnd(event: MarkerDragEvent) {
    if (!event.lngLat) return;
    setNewLogMarker(event.lngLat);
  }

  return (
    <Map
      initialViewState={{
        longitude: lastLog?.longitude || ANKARA_COORDINATES.longitude,
        latitude: lastLog?.latitude || ANKARA_COORDINATES.latitude,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      reuseMaps={true}
      ref={mapRef}
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      style={{ width: '100vw', height: '100vh' }}
      onClick={(event) => {
        setNewLogMarker(event.lngLat);
        setSidebarVisible(true);
        mapRef.current?.flyTo({
          center: [event.lngLat.lng, event.lngLat.lat],
          duration: 1000,
        });
      }}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {newLogMarker && (
        <Marker
          draggable
          onDragEnd={handleDragEnd}
          longitude={newLogMarker.lng}
          latitude={newLogMarker.lat}
        >
          <MapPin color="#38E54D" />
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
          <MapPin color="white" />
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

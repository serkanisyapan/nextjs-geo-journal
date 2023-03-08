import { useContext, useState, useRef, useEffect } from 'react';
import Map, {
  Marker,
  MarkerDragEvent,
  MapRef,
  MapLayerMouseEvent,
} from 'react-map-gl';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import TravelLogContext from '@/context/TravelLogContext';
import MapPin from './MapPin';
import MapControls from './MapControls';
import LogPopup from './LogPopup';

interface Props {
  logs: TravelLogTypeWithId[];
}

const ANKARA_COORDINATES = {
  latitude: 39.944235279643806,
  longitude: 32.84854923915691,
};

export default function TravelLogMap({ logs }: Props) {
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);
  const { newLogMarker, setNewLogMarker, sidebarVisible, setSidebarVisible } =
    useContext(TravelLogContext);
  const mapRef = useRef<MapRef>(null);
  const lastLog = logs[logs.length - 1];

  function handleDragEnd(event: MarkerDragEvent) {
    if (!event.lngLat) return;
    setNewLogMarker(event.lngLat);
  }

  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    if (popupInfo) return;
    setNewLogMarker(event.lngLat);
    setSidebarVisible(true);
    mapRef.current?.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat],
      duration: 1000,
    });
  };

  useEffect(() => {
    if (sidebarVisible && !newLogMarker) {
      const getMapCenter = mapRef.current?.getCenter();
      if (!getMapCenter) return;
      setNewLogMarker(getMapCenter);
    }
  }, [sidebarVisible, newLogMarker, setNewLogMarker]);

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
      onClick={handleMapClick}
    >
      <MapControls />
      {newLogMarker && (
        <Marker
          draggable
          onDragEnd={handleDragEnd}
          longitude={newLogMarker.lng}
          latitude={newLogMarker.lat}
        >
          <MapPin color="#38E54D" size={44} />
        </Marker>
      )}
      {logs.map((log) => {
        const isSelectedLog = popupInfo?._id === log._id;
        return (
          <Marker
            key={`marker-${log._id}`}
            longitude={log.longitude}
            latitude={log.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(log);
              mapRef.current?.flyTo({
                // @ts-ignore
                center: [e.target._lngLat.lng, e.target._lngLat.lat],
                duration: 500,
              });
            }}
            style={{ cursor: 'pointer' }}
          >
            <MapPin
              color={isSelectedLog ? '#FF785A' : 'white'}
              size={isSelectedLog ? 44 : 32}
            />
          </Marker>
        );
      })}
      {popupInfo && (
        <LogPopup handlePopupClose={handlePopupClose} popupInfo={popupInfo} />
      )}
    </Map>
  );
}

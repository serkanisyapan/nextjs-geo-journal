import { useContext, useEffect } from 'react';
import Map, {
  Popup,
  Marker,
  MarkerDragEvent,
  MapLayerMouseEvent,
} from 'react-map-gl';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import TravelLogContext from '@/context/TravelLogContext';
import { MapPin } from './MapIcons';
import PopupInfo from './PopupInfo';
import GeocoderControl from './GeocoderSearch';

interface Props {
  logs: TravelLogTypeWithId[];
}

const ANKARA_COORDINATES = {
  latitude: 39.944235279643806,
  longitude: 32.84854923915691,
};

export default function TravelLogMap({ logs }: Props) {
  const {
    popupInfo,
    setPopupInfo,
    newLogMarker,
    setNewLogMarker,
    sidebarVisible,
    setSidebarVisible,
    mapRef,
  } = useContext(TravelLogContext);
  const lastLog = logs[logs.length - 1];

  function handleDragEnd(event: MarkerDragEvent) {
    if (!event.lngLat) return;
    setNewLogMarker(event.lngLat);
  }

  const handleMapClick = (event: MapLayerMouseEvent) => {
    if (popupInfo) return;
    setNewLogMarker(event.lngLat);
    setSidebarVisible(true);
    mapRef.current?.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat],
      duration: 1000,
    });
  };

  // if user changes filter while a popup is open that popup gets cleared
  const clearPopupFiltered = (
    popup: TravelLogTypeWithId
  ): boolean | undefined => {
    if (!popup) return undefined;
    const logsID = logs.filter((log) => log._id === popup._id);
    if (logsID.length) {
      return true;
    }
    setPopupInfo(null);
    return false;
  };

  useEffect(() => {
    if (popupInfo) return;
    if (sidebarVisible && !newLogMarker) {
      const getMapCenter = mapRef.current?.getCenter();
      if (!getMapCenter) return;
      setNewLogMarker(getMapCenter);
    }
  }, [sidebarVisible, popupInfo, newLogMarker, setNewLogMarker, mapRef]);

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
      style={{ width: '100vw', height: '100vh' }}
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      onClick={handleMapClick}
    >
      <GeocoderControl
        mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        position="top-left"
        clearOnBlur={true}
      />
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
        const isVisited = log.visited === 'Yes';
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
              color={isVisited ? '#8be9fc' : '#F51AA4'}
              size={isSelectedLog ? 44 : 32}
            />
          </Marker>
        );
      })}
      {popupInfo && clearPopupFiltered(popupInfo) && (
        <Popup
          closeOnClick={true}
          maxWidth="300px"
          style={{
            color: 'black',
            fontSize: '24px',
            fontFamily: 'monospace',
            padding: '0px',
            margin: '0px',
          }}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
        >
          <PopupInfo />
        </Popup>
      )}
    </Map>
  );
}

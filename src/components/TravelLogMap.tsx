import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import MapPin from './MapPin';
import Popups from './PopupInfo';

interface Props {
  logs: TravelLogTypeWithId[];
}

export default function TravelLogMap({ logs }: Props) {
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);

  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken="pk.eyJ1IjoidHVya2xlcmJ1cmFkYSIsImEiOiJjbDk3Z3RrdXUwOXhjM3BtcXpkMXIzdjByIn0.8_2Y6tJvTLl7tu0dkc283g"
      style={{ width: '100vw', height: '100vh' }}
    >
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
          style={{ color: 'black' }}
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <Popups popupInfo={popupInfo} />
        </Popup>
      )}
    </Map>
  );
}

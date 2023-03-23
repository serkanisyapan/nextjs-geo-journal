import { TravelLogType } from '@/models/TravelLogValidator';
import { useState, useEffect, useRef } from 'react';
import Map, { Popup, Marker, MapRef } from 'react-map-gl';
import { useRouter } from 'next/router';
import { MapPin } from '../MapIcons';
import ProfilePopup from './ProfilePopup';
import ProfileSidebar from './ProfileSidebar';

const ANKARA_COORDINATES = {
  latitude: 39.944235279643806,
  longitude: 32.84854923915691,
};

interface VisitLogsProps {
  username: string;
}

export default function VisitLogs({ username }: VisitLogsProps) {
  const [logs, setLogs] = useState<TravelLogType[] | []>([]);
  const [popupInfo, setPopupInfo] = useState<TravelLogType | null>(null);
  const [filterLogsBy, setFilterLogsBy] = useState<string>('');
  const mapRef = useRef<MapRef | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserLogs = async () => {
      const response = await fetch(`/api/u/${username}`);
      const logsJSON = await response.json();
      if (logsJSON.message) {
        router.push('/login');
        return;
      }
      setLogs(logsJSON);
    };
    fetchUserLogs();
  }, [username, router]);

  const openPopup = (log: TravelLogType) => {
    setPopupInfo(log);
  };

  const filteredLogs = logs.filter((log) => {
    if (filterLogsBy === 'Visited') {
      return log.visited === 'Yes';
    }
    if (filterLogsBy === 'Not Visited') {
      return log.visited === 'No';
    }
    if (filterLogsBy === 'Favorite') {
      return log.favorited;
    }
    return log;
  });

  const filterBy = (filter: string) => {
    setFilterLogsBy(filter);
  };

  return (
    <Map
      initialViewState={{
        longitude: ANKARA_COORDINATES.longitude,
        latitude: ANKARA_COORDINATES.latitude,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      reuseMaps={true}
      style={{ width: '100vw', height: '100vh' }}
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      ref={mapRef}
    >
      <ProfileSidebar
        mapRef={mapRef}
        openPopup={openPopup}
        filterBy={filterBy}
        filteredLogs={filteredLogs}
        filterLogsBy={filterLogsBy}
      />
      {filteredLogs.map((log) => {
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
                duration: 800,
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
      {popupInfo && (
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
          <ProfilePopup popupInfo={popupInfo} />
        </Popup>
      )}
    </Map>
  );
}

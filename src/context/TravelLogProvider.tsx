import useFetchLogs from '@/hooks/useFetchLogs';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { MapRef } from 'react-map-gl';
import TravelLogContext from './TravelLogContext';

interface NewLogType {
  lng: number;
  lat: number;
}

interface ProviderProps {
  children: ReactNode;
}

interface AlertMessage {
  message: string;
  status: string;
}

export default function TravelLogProvider({ children }: ProviderProps) {
  const { logs, setLogs } = useFetchLogs();
  const [filterLogs, setFilterLogs] = useState<string>('');
  const [newLogMarker, setNewLogMarker] = useState<NewLogType | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [logsbarVisible, setLogsbarVisible] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);
  const [alert, setAlert] = useState<AlertMessage | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const filteredLogs = logs.filter((log) => {
    if (filterLogs === 'Visited') {
      return log.visited === 'Yes';
    }
    if (filterLogs === 'Not Visited') {
      return log.visited === 'No';
    }
    if (filterLogs === 'Favorite') {
      return log.favorited;
    }
    return log;
  });

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }, [alert]);

  return (
    <TravelLogContext.Provider
      value={{
        logs,
        filteredLogs,
        setLogs,
        filterLogs,
        setFilterLogs,
        newLogMarker,
        setNewLogMarker,
        sidebarVisible,
        setSidebarVisible,
        logsbarVisible,
        setLogsbarVisible,
        popupInfo,
        setPopupInfo,
        alert,
        setAlert,
        mapRef,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}

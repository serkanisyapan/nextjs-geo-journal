import useFetchLogs from '@/hooks/useFetchLogs';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { MapRef } from 'react-map-gl';
import TravelLogContext from './TravelLogContext';

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
    const newTimeout = setTimeout(() => {
      setAlert(null);
    }, 2000);
    return () => clearTimeout(newTimeout);
  }, [alert]);

  return (
    <TravelLogContext.Provider
      value={{
        logs,
        filteredLogs,
        setLogs,
        filterLogs,
        setFilterLogs,
        alert,
        setAlert,
        mapRef,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}

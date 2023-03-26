import useFetchLogs from '@/hooks/useFetchLogs';
import { ReactNode, useState, useRef } from 'react';
import { MapRef } from 'react-map-gl';
import TravelLogContext from './TravelLogContext';

interface ProviderProps {
  children: ReactNode;
}

export default function TravelLogProvider({ children }: ProviderProps) {
  const { logs, setLogs } = useFetchLogs();
  const [filterLogs, setFilterLogs] = useState<string>('');
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

  return (
    <TravelLogContext.Provider
      value={{
        logs,
        filteredLogs,
        setLogs,
        filterLogs,
        setFilterLogs,
        mapRef,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}

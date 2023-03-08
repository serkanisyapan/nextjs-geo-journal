import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { ReactNode, useState, useRef } from 'react';
import { MapRef } from 'react-map-gl';
import TravelLogContext from './TravelLogContext';

interface NewLogType {
  lng: number;
  lat: number;
}

interface ProviderProps {
  children: ReactNode;
}

export default function TravelLogProvider({ children }: ProviderProps) {
  const [newLogMarker, setNewLogMarker] = useState<NewLogType | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [logsbarVisible, setLogsbarVisible] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<TravelLogTypeWithId | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  return (
    <TravelLogContext.Provider
      value={{
        newLogMarker,
        setNewLogMarker,
        sidebarVisible,
        setSidebarVisible,
        logsbarVisible,
        setLogsbarVisible,
        popupInfo,
        setPopupInfo,
        mapRef,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}

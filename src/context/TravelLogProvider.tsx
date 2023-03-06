import { ReactNode, useState } from 'react';
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

  return (
    <TravelLogContext.Provider
      value={{
        newLogMarker,
        setNewLogMarker,
        sidebarVisible,
        setSidebarVisible,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}

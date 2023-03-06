import { createContext } from 'react';

interface NewLogType {
  lng: number;
  lat: number;
}

interface TravelLogContext {
  newLogMarker: NewLogType | null;
  setNewLogMarker: (coordinates: NewLogType | null) => void;
  sidebarVisible: boolean;
  setSidebarVisible: (isVisible: boolean) => any;
}

export default createContext<TravelLogContext>({
  newLogMarker: null,
  setNewLogMarker: () => {},
  sidebarVisible: false,
  setSidebarVisible: () => false,
});

import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { createContext, MutableRefObject } from 'react';
import { MapRef } from 'react-map-gl';

interface NewLogType {
  lng: number;
  lat: number;
}

const initialState = {
  newLogMarker: null,
  setNewLogMarker: () => {},
  sidebarVisible: false,
  setSidebarVisible: () => false,
  logsbarVisible: false,
  setLogsbarVisible: () => false,
  popupInfo: null,
  setPopupInfo: () => {},
  mapRef: { current: null },
};

interface TravelLogContext {
  newLogMarker: NewLogType | null;
  setNewLogMarker: (coordinates: NewLogType | null) => void;
  sidebarVisible: boolean;
  setSidebarVisible: (isVisible: boolean) => any;
  logsbarVisible: boolean;
  setLogsbarVisible: (isVisible: boolean) => any;
  popupInfo: TravelLogTypeWithId | null;
  setPopupInfo: (log: TravelLogTypeWithId) => any;
  mapRef: MutableRefObject<MapRef | null>;
}

export default createContext<TravelLogContext>(initialState);

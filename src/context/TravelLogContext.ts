import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { createContext, MutableRefObject } from 'react';
import { MapRef } from 'react-map-gl';

interface NewLogType {
  lng: number;
  lat: number;
}

interface AlertMessage {
  message: string;
  status: string;
}

const initialState = {
  logs: [],
  filteredLogs: [],
  setLogs: () => [],
  filterLogs: '',
  setFilterLogs: () => '',
  newLogMarker: null,
  setNewLogMarker: () => {},
  sidebarVisible: false,
  setSidebarVisible: () => false,
  logsbarVisible: false,
  setLogsbarVisible: () => false,
  popupInfo: null,
  setPopupInfo: () => null,
  alert: null,
  setAlert: () => null,
  mapRef: { current: null },
};

interface TravelLogContext {
  logs: TravelLogTypeWithId[];
  filteredLogs: TravelLogTypeWithId[];
  setLogs: (logs: TravelLogTypeWithId[] | []) => void;
  filterLogs: string | '';
  setFilterLogs: (evt: string) => any;
  newLogMarker: NewLogType | null;
  setNewLogMarker: (coordinates: NewLogType | null) => void;
  sidebarVisible: boolean;
  setSidebarVisible: (isVisible: boolean) => any;
  logsbarVisible: boolean;
  setLogsbarVisible: (isVisible: boolean) => any;
  popupInfo: TravelLogTypeWithId | null;
  setPopupInfo: (log: TravelLogTypeWithId | null) => any;
  alert: AlertMessage | null;
  setAlert: (value: AlertMessage) => void;
  mapRef: MutableRefObject<MapRef | null>;
}

export default createContext<TravelLogContext>(initialState);

import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { createContext, MutableRefObject } from 'react';
import { MapRef } from 'react-map-gl';

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
  alert: AlertMessage | null;
  setAlert: (value: AlertMessage) => void;
  mapRef: MutableRefObject<MapRef | null>;
}

export default createContext<TravelLogContext>(initialState);

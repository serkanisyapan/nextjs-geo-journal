import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { createContext, MutableRefObject } from 'react';
import { MapRef } from 'react-map-gl';

const initialState = {
  logs: [],
  filteredLogs: [],
  setLogs: () => [],
  filterLogs: '',
  setFilterLogs: () => '',
  mapRef: { current: null },
};

interface TravelLogContext {
  logs: TravelLogTypeWithId[];
  filteredLogs: TravelLogTypeWithId[];
  setLogs: (logs: TravelLogTypeWithId[] | []) => void;
  filterLogs: string | '';
  setFilterLogs: (evt: string) => any;
  mapRef: MutableRefObject<MapRef | null>;
}

export default createContext<TravelLogContext>(initialState);

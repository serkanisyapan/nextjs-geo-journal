import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { create } from 'zustand';

interface NewLogType {
  lng: number;
  lat: number;
}

interface MarkerStore {
  newLogMarker: NewLogType | null;
  setNewLogMarker: (coordinates: NewLogType | null) => void;
  popupInfo: TravelLogTypeWithId | null;
  setPopupInfo: (log: TravelLogTypeWithId | null) => void;
}

const useMarkerStore = create<MarkerStore>((set) => ({
  newLogMarker: null,
  popupInfo: null,
  setNewLogMarker: (coordinates) => set({ newLogMarker: coordinates }),
  setPopupInfo: (log) => set({ popupInfo: log }),
}));

export default useMarkerStore;

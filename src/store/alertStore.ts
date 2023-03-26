import { create } from 'zustand';

interface AlertType {
  message: string;
  status: string;
}

interface AlertStore {
  alert: AlertType | null;
  setAlert: (value: AlertType | null) => void;
}

const useAlertStore = create<AlertStore>((set) => ({
  alert: null,
  setAlert: (value) => {
    set({ alert: value });
    setTimeout(() => {
      set({ alert: null });
    }, 1500);
  },
}));

export default useAlertStore;

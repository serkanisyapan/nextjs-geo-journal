import { create } from 'zustand';

interface SiderbarStore {
  sidebarVisible: boolean;
  logsbarVisible: boolean;
  setSidebarVisible: (isVisible: boolean) => void;
  setLogsbarVisible: (isVisible: boolean) => void;
}

const useSidebarsStore = create<SiderbarStore>((set) => ({
  sidebarVisible: false,
  logsbarVisible: false,
  setSidebarVisible: (isVisible) => set(() => ({ sidebarVisible: isVisible })),
  setLogsbarVisible: (isVisible) => set(() => ({ logsbarVisible: isVisible })),
}));

export default useSidebarsStore;

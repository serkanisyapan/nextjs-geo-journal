import useSidebarsStore from '@/store/sidebarsStore';
import useMarkerStore from '@/store/markerStore';
import TravelLogForm from './TravelLogForm';

export default function SidebarForm() {
  const { setPopupInfo } = useMarkerStore();
  const { sidebarVisible, setSidebarVisible } = useSidebarsStore();

  return (
    <>
      <div className="fixed top-12 right-2 z-[997]">
        <button
          onClick={() => {
            setPopupInfo(null);
            setSidebarVisible(true);
          }}
          className="btn btn-info"
        >
          + New Log
        </button>
      </div>
      {sidebarVisible && (
        <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[999] overflow-y-auto">
          <TravelLogForm />
        </div>
      )}
    </>
  );
}

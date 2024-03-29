import useSidebarsStore from '@/store/sidebarsStore';
import useMarkerStore from '@/store/markerStore';

export default function CloseButton() {
  const { setNewLogMarker } = useMarkerStore();
  const { setSidebarVisible, setLogsbarVisible } = useSidebarsStore();

  return (
    <button
      onClick={() => {
        setSidebarVisible(false);
        setLogsbarVisible(false);
        setNewLogMarker(null);
      }}
      className="btn btn-circle btn-outline btn-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

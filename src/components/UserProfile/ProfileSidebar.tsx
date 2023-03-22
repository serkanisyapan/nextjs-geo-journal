import { TravelLogType } from '@/models/TravelLogValidator';
import { MutableRefObject, useState } from 'react';
import { MapRef } from 'react-map-gl';

interface SidebarProps {
  filteredLogs: TravelLogType[] | [];
  mapRef: MutableRefObject<MapRef | null>;
  openPopup: (log: TravelLogType) => void;
  filterBy: (filter: string) => void;
  filterLogsBy: string;
}

export default function ProfileSidebar({
  filteredLogs,
  mapRef,
  openPopup,
  filterBy,
  filterLogsBy,
}: SidebarProps) {
  const [logsbarVisible, setLogsbarVisible] = useState<boolean>(false);
  const shortenDescription = (description: string) => {
    return description.split('').slice(0, 30).join('');
  };

  let logContent;
  if (filteredLogs.length > 0) {
    logContent = (
      <div className="flex flex-col gap-3 my-3 font-mono text-lg">
        <span>{filteredLogs.length} log(s) found</span>
        {filteredLogs.map((log) => (
          <div
            onClick={() => {
              mapRef.current?.flyTo({
                center: [log.longitude, log.latitude],
                duration: 1000,
              });
              openPopup(log);
            }}
            className="bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:cursor-pointer"
            key={log._id.toString()}
          >
            <p className="mb-2">{log.title}</p>
            <p className="text-base">
              {shortenDescription(log.description)}...
            </p>
            <p className="text-sm mt-4">
              {new Date(log.visitDate.toString()).toLocaleDateString()} -{' '}
              <span>{log.rating}/10</span>
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    logContent = (
      <div>
        <p className="text-lg">No logs found...</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-2 right-2 z-[989] font-mono">
        <button
          onClick={() => setLogsbarVisible(true)}
          className="btn btn-info"
        >
          All Logs
        </button>
      </div>
      {logsbarVisible && (
        <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[998] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <select
              className="select"
              onChange={(event) => filterBy(event.target.value)}
              defaultValue={filterLogsBy}
            >
              <option value="">---</option>
              <option value="Visited">Visited</option>
              <option value="Not Visited">Not Visited</option>
            </select>
            <button
              onClick={() => {
                setLogsbarVisible(false);
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
          </div>
          {logContent}
        </div>
      )}
    </>
  );
}

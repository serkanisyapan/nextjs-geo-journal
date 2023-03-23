import { useContext } from 'react';
import TravelLogContext from '@/context/TravelLogContext';
import CloseButton from './CloseButton';

export default function SidebarLogs() {
  const {
    filteredLogs,
    filterLogs,
    setFilterLogs,
    logsbarVisible,
    setLogsbarVisible,
    mapRef,
    setPopupInfo,
  } = useContext(TravelLogContext);

  const shortenDescription = (description: string) => {
    return description.split('').slice(0, 30).join('');
  };

  let logContent;
  if (filteredLogs.length > 0) {
    logContent = (
      <div className="flex flex-col gap-3 my-3">
        <span>{filteredLogs.length} log(s) found</span>
        {filteredLogs.map((log) => (
          <div
            onClick={() => {
              mapRef.current?.flyTo({
                center: [log.longitude, log.latitude],
                duration: 1000,
              });
              setPopupInfo(log);
            }}
            className="bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:cursor-pointer"
            key={log._id.toString()}
          >
            <p className="mb-2 text-lg">{log.title}</p>
            <p className="break-words">
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
      <div className="fixed top-[115px] right-2 z-[989]">
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
              onChange={(event) => setFilterLogs(event.target.value)}
              defaultValue={filterLogs}
            >
              <option value="">---</option>
              <option value="Visited">Visited</option>
              <option value="Not Visited">Not Visited</option>
              <option value="Favorite">Favorite</option>
            </select>
            <CloseButton />
          </div>
          {logContent}
        </div>
      )}
    </>
  );
}

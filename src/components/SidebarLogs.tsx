import { useContext } from 'react';
import TravelLogContext from '@/context/TravelLogContext';
import useSidebarsStore from '@/store/sidebarsStore';
import useMarkerStore from '@/store/markerStore';
import useRequests from '@/hooks/useRequests';
import CloseButton from './CloseButton';
import { DeleteIcon, FavoriteStar } from './MapIcons';

export default function SidebarLogs() {
  const { logsbarVisible, setLogsbarVisible } = useSidebarsStore();
  const { setPopupInfo } = useMarkerStore();
  const { filteredLogs, filterLogs, setFilterLogs, mapRef } =
    useContext(TravelLogContext);
  const { deleteLogReq, addFavoriteReq } = useRequests();

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
            <div className="flex flex-row justify-between items-center mt-3">
              <p className="text-sm">
                {new Date(log.visitDate.toString()).toLocaleDateString()} -{' '}
                <span>{log.rating}/10</span>
              </p>
              <div>
                <div className="tooltip tooltip-bottom" data-tip="Favorite">
                  <button
                    className="hover:bg-slate-400 rounded-full p-1"
                    onClick={(event) => {
                      event.stopPropagation();
                      addFavoriteReq(log);
                    }}
                  >
                    <FavoriteStar isFavorited={log.favorited} />
                  </button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Delete">
                  <button
                    className="hover:bg-slate-400 rounded-full p-1"
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteLogReq(log);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
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
      <div className="fixed top-[105px] right-2 z-[989]">
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

import TravelLogContext from '@/context/TravelLogContext';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import useMarkerStore from '@/store/markerStore';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import LogEditForm from './LogEditForm';
import { DeleteIcon, EditIcon, FavoriteStar } from './MapIcons';

interface Props {
  popupInfo: TravelLogTypeWithId;
}

export default function PopupInfo({ popupInfo }: Props) {
  const [popupState, setPopupState] = useState<string>('');
  const [updateLogForm, setUpdateLogForm] = useState<boolean>(false);
  const { setPopupInfo } = useMarkerStore();
  const { logs, setLogs, setAlert } = useContext(TravelLogContext);

  const handleDeleteLog = (logID: string) => {
    const deleteLog = logs.filter((log) => log._id !== logID);
    setLogs(deleteLog);
  };

  const handleFavorite = (info: TravelLogTypeWithId) => {
    setPopupInfo({ ...popupInfo, favorited: !popupInfo.favorited });
    const updateLogs = logs.map((log) => {
      if (log._id === info._id) {
        return { ...log, favorited: !log.favorited };
      }
      return log;
    });
    setLogs(updateLogs);
  };

  const addFavoriteReq = async (log: TravelLogTypeWithId) => {
    try {
      const response = await fetch('/api/logs', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...log,
          favorited: !popupInfo.favorited,
          apiKey: localStorage.getItem('apiKey') || '',
        }),
      });
      if (response.ok) {
        if (!log.favorited) {
          setAlert({ message: 'Log added to favorites.', status: 'success' });
        } else {
          setAlert({
            message: 'Log removed from favorites.',
            status: 'success',
          });
        }
        // @ts-ignore
        handleFavorite(log);
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setAlert({ message: `${error.message}`, status: 'error' });
    }
  };

  const deleteLogReq = async (log: TravelLogTypeWithId) => {
    try {
      const response = await fetch('/api/logs', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ logID: log._id }),
      });
      if (response.ok) {
        setAlert({
          message: 'Log got deleted succesfully.',
          status: 'success',
        });
        const id = log._id;
        handleDeleteLog(id);
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setPopupState(error.message);
      setTimeout(() => {
        setPopupState('');
      }, 1500);
    }
  };

  return (
    <>
      {updateLogForm && createPortal(<LogEditForm />, document.body)}

      {popupState && (
        <div className="alert alert-error shadow-lg my-2">
          <div>
            <span>{popupState}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col mb-2">
        <p className="text-lg font-bold">{popupInfo.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={() => addFavoriteReq(popupInfo)}>
            <FavoriteStar isFavorited={popupInfo.favorited} />
          </button>
          <button onClick={() => setUpdateLogForm(true)}>
            <EditIcon />
          </button>
          <button onClick={() => deleteLogReq(popupInfo)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="w-[280px] text-center">
        <figure className="mb-2">
          <picture>
            <img
              className="w-[280px] h-[160px] object-cover rounded-t-md"
              src={popupInfo.image}
              alt={popupInfo.title}
            />
          </picture>
          <figcaption className="p-1 text-base bg-black text-white">
            {popupInfo?.rating}/10
          </figcaption>
        </figure>
      </div>
      <div className="bg-gray-800 p-2 text-white rounded-md">
        <p className="mb-2 text-lg break-words">{popupInfo?.description}</p>
        <p className="italic text-base">
          {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

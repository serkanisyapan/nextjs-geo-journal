import TravelLogContext from '@/context/TravelLogContext';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import useAlertStore from '@/store/alertStore';
import useMarkerStore from '@/store/markerStore';
import { useContext } from 'react';

export default function useFavoriteLog() {
  const { setAlert } = useAlertStore();
  const { setPopupInfo } = useMarkerStore();
  const { logs, setLogs } = useContext(TravelLogContext);

  const handleFavorite = (info: TravelLogTypeWithId) => {
    setPopupInfo({ ...info, favorited: !info.favorited });
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
          favorited: !log.favorited,
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

  return { addFavoriteReq };
}

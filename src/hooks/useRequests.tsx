import TravelLogContext from '@/context/TravelLogContext';
import {
  TravelLogType,
  TravelLogTypeWithId,
} from '@/models/TravelLogValidator';
import useAlertStore from '@/store/alertStore';
import useMarkerStore from '@/store/markerStore';
import useSidebarsStore from '@/store/sidebarsStore';
import { useContext, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function useRequests() {
  const [formError, setFormError] = useState<string>('');
  const [sendingRequest, setSendingRequest] = useState<boolean>(false);
  const { setAlert } = useAlertStore();
  const { setNewLogMarker } = useMarkerStore();
  const { setSidebarVisible } = useSidebarsStore();
  const { logs, setLogs } = useContext(TravelLogContext);
  const { setPopupInfo } = useMarkerStore();

  // if response is ok, updates updates log with changes values
  const handleUpdateLog = (data: TravelLogTypeWithId) => {
    const updateLogs = logs.map((log) => {
      if (log._id === data._id) {
        return { ...data };
      }
      return log;
    });
    setLogs(updateLogs);
  };

  // if response is ok, deletes an existing log
  const handleDeleteLog = (logID: string) => {
    const deleteLog = logs.filter((log) => log._id !== logID);
    setLogs(deleteLog);
  };

  // if response is ok, adds log to the favorite log(s)
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

  // sends form data to add new log
  const onSubmit: SubmitHandler<TravelLogType> = async (data) => {
    try {
      setSendingRequest(true);
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setAlert({ message: 'Log got added successfully.', status: 'success' });
        // reset();
        setSidebarVisible(false);
        setNewLogMarker(null);
        // @ts-ignore
        setLogs((prev) => [...prev, data]);
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setFormError(error.message);
      setTimeout(() => {
        setFormError('');
      }, 1500);
    }
    setSendingRequest(false);
  };

  // sends form data to update an existing log
  const onSubmitUpdate: SubmitHandler<TravelLogType> = async (data) => {
    try {
      setSendingRequest(true);
      const response = await fetch('/api/logs', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setAlert({
          message: 'Log got updated succesfully.',
          status: 'success',
        });
        // @ts-ignore
        handleUpdateLog(data);
        setPopupInfo(null);
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setFormError(error.message);
      setTimeout(() => {
        setFormError('');
      }, 1500);
    }
    setSendingRequest(false);
  };

  // sends request to add log to favorite log(s)
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

  // sends request to delete an existing log
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
      setAlert({ message: error.message, status: 'error' });
    }
  };

  return {
    onSubmit,
    onSubmitUpdate,
    deleteLogReq,
    addFavoriteReq,
    formError,
    sendingRequest,
  };
}

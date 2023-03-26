import TravelLogContext from '@/context/TravelLogContext';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import useAlertStore from '@/store/alertStore';
import { useContext } from 'react';

export default function useDeleteLog() {
  const { logs, setLogs } = useContext(TravelLogContext);
  const { setAlert } = useAlertStore();

  const handleDeleteLog = (logID: string) => {
    const deleteLog = logs.filter((log) => log._id !== logID);
    setLogs(deleteLog);
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
      setAlert({ message: error.message, status: 'error' });
    }
  };
  return { deleteLogReq };
}

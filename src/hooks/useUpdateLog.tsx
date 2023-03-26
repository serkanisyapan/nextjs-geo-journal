import TravelLogContext from '@/context/TravelLogContext';
import {
  TravelLogType,
  TravelLogTypeWithId,
} from '@/models/TravelLogValidator';
import useAlertStore from '@/store/alertStore';
import useMarkerStore from '@/store/markerStore';
import { useContext, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function useUpdateLogs() {
  const [formError, setFormError] = useState<string>('');
  const [updatingLog, setUpdateingLog] = useState<boolean>(false);
  const { logs, setLogs } = useContext(TravelLogContext);
  const { setAlert } = useAlertStore();
  const { setPopupInfo } = useMarkerStore();

  const handleUpdateLog = (data: TravelLogTypeWithId) => {
    const updateLogs = logs.map((log) => {
      if (log._id === data._id) {
        return { ...data };
      }
      return log;
    });
    setLogs(updateLogs);
  };

  const onSubmit: SubmitHandler<TravelLogType> = async (data) => {
    try {
      setUpdateingLog(true);
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
    setUpdateingLog(false);
  };

  return { onSubmit, formError, updatingLog };
}

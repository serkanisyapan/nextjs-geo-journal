import TravelLogContext from '@/context/TravelLogContext';
import { TravelLogType } from '@/models/TravelLogValidator';
import useAlertStore from '@/store/alertStore';
import useMarkerStore from '@/store/markerStore';
import useSidebarsStore from '@/store/sidebarsStore';
import { useContext, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function useSubmitLog() {
  const [formError, setFormError] = useState<string>('');
  const [sendingNewLog, setSendingNewLog] = useState<boolean>(false);
  const { setAlert } = useAlertStore();
  const { setNewLogMarker } = useMarkerStore();
  const { setSidebarVisible } = useSidebarsStore();
  const { setLogs } = useContext(TravelLogContext);

  const onSubmit: SubmitHandler<TravelLogType> = async (data) => {
    try {
      setSendingNewLog(true);
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
    setSendingNewLog(false);
  };

  return { onSubmit, formError, sendingNewLog };
}

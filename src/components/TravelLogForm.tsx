import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import { v4 as uuidv4 } from 'uuid';
import TravelLogContext from '@/context/TravelLogContext';
import { useSession } from 'next-auth/react';
import useMarkerStore from '@/store/markerStore';
import useSidebarsStore from '@/store/sidebarsStore';
import CloseButton from './CloseButton';
import FormInputs from './FormInputs';

export default function TravelLogForm() {
  const [formError, setFormError] = useState<string>('');
  const [sendingNewLog, setSendingNewLog] = useState<boolean>(false);
  const [favorited, setFavorited] = useState(false);
  const [logId, setLogId] = useState('');
  const [userId, setUserId] = useState('');
  const { newLogMarker, setNewLogMarker } = useMarkerStore();
  const { setSidebarVisible } = useSidebarsStore();
  const { setLogs, setAlert } = useContext(TravelLogContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogValidator),
    defaultValues: {
      rating: 5,
      visited: 'Yes',
      latitude: newLogMarker?.lat,
      longitude: newLogMarker?.lng,
      // @ts-ignore
      visitDate: new Date().toISOString().substring(0, 10),
      apiKey: localStorage.getItem('apiKey') ?? '',
    },
  });
  const { data: session } = useSession();

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
        localStorage.setItem('apiKey', data.apiKey);
        reset();
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

  useEffect(() => {
    if (!newLogMarker) return;
    setValue('latitude', newLogMarker.lat);
    setValue('longitude', newLogMarker.lng);
  }, [newLogMarker, setValue]);

  useEffect(() => {
    setValue('_id', logId);
    setValue('userId', userId);
    setValue('favorited', favorited);
  }, [setValue, logId, userId, favorited]);

  return (
    <>
      <div className="text-right">
        <CloseButton />
      </div>
      {formError && (
        <div className="alert alert-error shadow-lg my-2">
          <div>
            <span>{formError}</span>
          </div>
        </div>
      )}
      <form
        className="max-w-lg m-auto flex flex-col gap-2 my-4 mx-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInputs errors={errors} register={register} />
        <button
          onClick={() => {
            if (!session) return;
            setFavorited(false);
            setLogId(uuidv4());
            // @ts-ignore
            setUserId(session.user?.id);
          }}
          className="btn btn-info"
          type="submit"
          disabled={sendingNewLog}
        >
          {!sendingNewLog ? 'Add Log' : <span>Adding Log...</span>}
        </button>
      </form>
    </>
  );
}

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import TravelLogContext from '@/context/TravelLogContext';
import CloseButton from './CloseButton';
import FormInputs from './FormInputs';

export default function TravelLogForm() {
  const [formError, setFormError] = useState<string>('');
  const [sendingNewLog, setSendingNewLog] = useState<boolean>(false);
  const { newLogMarker, setSidebarVisible, setNewLogMarker } =
    useContext(TravelLogContext);
  const router = useRouter();
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
        localStorage.setItem('apiKey', data.apiKey);
        reset();
        setSidebarVisible(false);
        setNewLogMarker(null);
        router.push({ pathname: '/', query: { name: 'add-log' } }, '/');
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
        <button className="btn btn-info" type="submit" disabled={sendingNewLog}>
          {!sendingNewLog ? 'Add Log' : <span>Adding Log...</span>}
        </button>
      </form>
    </>
  );
}

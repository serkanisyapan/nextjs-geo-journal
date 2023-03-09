import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import formInputs from '@/data/formInputs';
import defaultDate from '@/utils/defaultDate';
import TravelLogContext from '@/context/TravelLogContext';
import CloseButton from './CloseButton';

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
      visitDate: defaultDate(),
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

  const allInputs = formInputs.map((formInput) => {
    const { title, label, type } = formInput;
    const registerProperty = title as keyof TravelLogType;
    const titleProperty = title as keyof typeof errors;
    return (
      <div key={label} className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        {type === 'textarea' && (
          <textarea
            className={`textarea textarea-bordered ${
              errors.description ? 'textarea-error' : ''
            }`}
            {...register(registerProperty)}
          ></textarea>
        )}
        {(title === 'latitude' || title === 'longitude') && (
          <input
            className="input input-bordered w-full"
            type={type}
            disabled
            {...register(registerProperty)}
          />
        )}
        {type === 'select' && (
          <select className="select w-full" {...register('visited')}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        )}
        {(title === 'apiKey' ||
          title === 'title' ||
          title === 'image' ||
          title === 'rating' ||
          title === 'visitDate') && (
          <input
            className={`input input-bordered ${
              errors[titleProperty] ? 'input-error' : ''
            }`}
            type={type}
            {...register(registerProperty)}
          />
        )}
        {errors[titleProperty] && <span>{errors[titleProperty]?.message}</span>}
      </div>
    );
  });

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
        {allInputs}
        <button className="btn btn-info" type="submit" disabled={sendingNewLog}>
          {!sendingNewLog ? 'Add Log' : <span>Loading...</span>}
        </button>
      </form>
    </>
  );
}

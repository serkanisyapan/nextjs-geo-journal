import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import defaultDate from '@/utils/defaultDate';
import formInputs from '@/data/formInputs';
import TravelLogContext from '@/context/TravelLogContext';
import CloseButton from './CloseButton';

export default function TravelLogForm() {
  const [formError, setFormError] = useState('');
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
      latitude: newLogMarker?.lat,
      longitude: newLogMarker?.lng,
      // @ts-ignore
      visitDate: defaultDate(),
    },
  });

  const onSubmit: SubmitHandler<TravelLogType> = async (data) => {
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
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
    }
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
            <CloseButton />
            <span>{formError}</span>
          </div>
        </div>
      )}
      <form
        className="max-w-lg m-auto flex flex-col gap-2 my-4 mx-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formInputs.map((input) => {
          const titleProperty = input.title as keyof typeof errors;
          return (
            <div key={input.label} className="form-control w-full">
              <label className="label">
                <span className="label-text">{input.label}</span>
              </label>
              {input.type === 'textarea' ? (
                <textarea
                  className={`textarea textarea-bordered ${
                    errors.description ? 'textarea-error' : ''
                  }`}
                  {...register(titleProperty)}
                ></textarea>
              ) : input.title === 'latitude' || input.title === 'longitude' ? (
                <input
                  className={`input input-bordered w-full ${
                    errors[titleProperty] ? 'input-error' : ''
                  }`}
                  type={input.type}
                  disabled
                  {...register(titleProperty)}
                />
              ) : (
                <input
                  type={input.type}
                  step="any"
                  className={`input input-bordered w-full ${
                    errors[titleProperty] ? 'input-error' : ''
                  }`}
                  {...register(titleProperty)}
                />
              )}
              {errors[titleProperty] && (
                <span>{errors[titleProperty]?.message}</span>
              )}
            </div>
          );
        })}
        <button className="btn btn-info" type="submit">
          Add Log
        </button>
      </form>
    </>
  );
}

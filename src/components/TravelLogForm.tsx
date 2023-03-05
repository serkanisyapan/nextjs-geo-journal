import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import defaultDate from '@/utils/defaultDate';
import formInputs from '@/data/formInputs';
import CloseButton from './CloseButton';

interface FormProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function TravelLogForm({ onClose, onComplete }: FormProps) {
  const [formError, setFormError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogValidator),
    defaultValues: {
      rating: 5,
      latitude: 90,
      longitude: 180,
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
        onComplete();
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

  return (
    <>
      <div className="text-right">
        <CloseButton onClose={onClose} />
      </div>
      {formError && (
        <div className="alert alert-error shadow-lg my-2">
          <div>
            <CloseButton onClose={() => setFormError('')} />
            <span>{formError}</span>
          </div>
        </div>
      )}
      <form
        className="max-w-lg m-auto flex flex-col gap-2 my-4 mx-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formInputs.map((input) => {
          const titleProperty = input.title;
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
                <span>{errors[titleProperty].message}</span>
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

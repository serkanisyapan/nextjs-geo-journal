import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import defaultDate from '@/utils/defaultDate';
import formInputs from '@/data/formInputs';

export default function TravelLogForm() {
  const {
    register,
    handleSubmit,
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
  const onSubmit: SubmitHandler<TravelLogType> = (data) => console.log(data);

  return (
    <form
      className="max-w-lg m-auto flex flex-col gap-2"
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
      <button className="btn btn-primary" type="submit">
        Add Log
      </button>
    </form>
  );
}

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';

export default function TravelLogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogValidator),
  });
  const onSubmit: SubmitHandler<TravelLogType> = (data) => console.log(data);

  return (
    <form
      className="max-w-lg m-auto flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full ${
            errors.title ? 'input-error' : ''
          }`}
          {...register('title')}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="textarea"
          className={`input input-bordered w-full ${
            errors.description ? 'input-error' : ''
          }`}
          {...register('description')}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <button className="btn btn-primary" type="submit">
        Add Log
      </button>
    </form>
  );
}

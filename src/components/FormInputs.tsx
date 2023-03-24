import formInputs from '@/data/formInputs';
import { TravelLogType } from '@/models/TravelLogValidator';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface FormInputsType {
  errors: FieldErrors;
  register: UseFormRegister<TravelLogType>;
}

export default function FormInputs({ errors, register }: FormInputsType) {
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
        {(title === 'title' ||
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
        {/* @ts-ignore */}
        {errors[titleProperty] && <span>{errors[titleProperty]?.message}</span>}
      </div>
    );
  });
  return <>{allInputs}</>;
}

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import useMarkerStore from '@/store/markerStore';
import useRequests from '@/hooks/useRequests';
import FormInputs from './FormInputs';

export default function LogEditForm() {
  const { popupInfo } = useMarkerStore();
  const { onSubmitUpdate, formError, sendingRequest } = useRequests();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogValidator),
    defaultValues: {
      ...popupInfo,
    },
  });

  useEffect(() => {
    const visitDateValue = () => {
      if (typeof popupInfo?.visitDate === 'string') {
        // @ts-ignore
        return popupInfo?.visitDate.substring(0, 10);
      }
      return popupInfo?.visitDate.toISOString().substring(0, 10);
    };

    setValue('visitDate', visitDateValue());
  }, [popupInfo, setValue]);

  return (
    <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[999] overflow-y-auto">
      {formError && (
        <div className="alert alert-error shadow-lg my-2">
          <span>{formError}</span>
        </div>
      )}
      <form
        className="max-w-lg m-auto flex flex-col gap-2 my-4 mx-2"
        onSubmit={handleSubmit(onSubmitUpdate)}
      >
        <FormInputs errors={errors} register={register} />
        <button
          className="btn btn-info"
          type="submit"
          disabled={sendingRequest}
        >
          {!sendingRequest ? 'Update Log' : 'Updating Log...'}
        </button>
      </form>
    </div>
  );
}

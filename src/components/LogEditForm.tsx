import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TravelLogValidator,
  TravelLogType,
  TravelLogTypeWithId,
} from '@/models/TravelLogValidator';
import TravelLogContext from '@/context/TravelLogContext';
import FormInputs from './FormInputs';

interface Props {
  handleUpdateLog: (data: TravelLogTypeWithId) => void;
}

export default function LogEditForm({ handleUpdateLog }: Props) {
  const [formError, setFormError] = useState<string>('');
  const [updatingLog, setUpdateingLog] = useState<boolean>(false);
  const { popupInfo, setPopupInfo, setAlert } = useContext(TravelLogContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogValidator),
    defaultValues: {
      apiKey: localStorage.getItem('apiKey') || '',
      ...popupInfo,
    },
  });

  const onSubmit: SubmitHandler<TravelLogType> = async (data) => {
    try {
      setUpdateingLog(true);
      const response = await fetch('/api/logs', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ ...data, logID: popupInfo?._id }),
      });
      if (response.ok) {
        setAlert('Log got updated succesfully.');
        const dataWithId: any = { ...data, _id: popupInfo?._id };
        localStorage.setItem('apiKey', data.apiKey);
        handleUpdateLog(dataWithId);
        setPopupInfo(null);
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
    setUpdateingLog(false);
  };

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInputs errors={errors} register={register} />
        <button className="btn btn-info" type="submit" disabled={updatingLog}>
          {!updatingLog ? 'Update Log' : <span>Updating Log...</span>}
        </button>
      </form>
    </div>
  );
}

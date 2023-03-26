import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLogValidator, TravelLogType } from '@/models/TravelLogValidator';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import useMarkerStore from '@/store/markerStore';
import useSubmitLog from '@/hooks/useSubmitLog';
import CloseButton from './CloseButton';
import FormInputs from './FormInputs';

export default function TravelLogForm() {
  const [favorited, setFavorited] = useState(false);
  const [logId, setLogId] = useState('');
  const [userId, setUserId] = useState('');
  const { newLogMarker } = useMarkerStore();
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
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
    },
  });
  const { data: session } = useSession();
  const { onSubmit, formError, sendingNewLog } = useSubmitLog();

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
        onSubmit={handleSubmit((data) => onSubmit(data))}
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

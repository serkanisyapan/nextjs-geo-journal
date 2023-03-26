import useDeleteLog from '@/hooks/useDeleteLog';
import useFavoriteLog from '@/hooks/useFavoriteLog';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import LogEditForm from './LogEditForm';
import { DeleteIcon, EditIcon, FavoriteStar } from './MapIcons';

interface Props {
  popupInfo: TravelLogTypeWithId;
}

export default function PopupInfo({ popupInfo }: Props) {
  const [updateLogForm, setUpdateLogForm] = useState<boolean>(false);
  const { deleteLogReq } = useDeleteLog();
  const { addFavoriteReq } = useFavoriteLog();

  return (
    <>
      {updateLogForm && createPortal(<LogEditForm />, document.body)}
      <div className="flex flex-col mb-2">
        <p className="text-lg font-bold">{popupInfo.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={() => addFavoriteReq(popupInfo)}>
            <FavoriteStar isFavorited={popupInfo.favorited} />
          </button>
          <button onClick={() => setUpdateLogForm(true)}>
            <EditIcon />
          </button>
          <button onClick={() => deleteLogReq(popupInfo)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="w-[280px] text-center">
        <figure className="mb-2">
          <picture>
            <img
              className="w-[280px] h-[160px] object-cover rounded-t-md"
              src={popupInfo.image}
              alt={popupInfo.title}
            />
          </picture>
          <figcaption className="p-1 text-base bg-black text-white">
            {popupInfo?.rating}/10
          </figcaption>
        </figure>
      </div>
      <div className="bg-gray-800 p-2 text-white rounded-md">
        <p className="mb-2 text-lg break-words">{popupInfo?.description}</p>
        <p className="italic text-base">
          {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

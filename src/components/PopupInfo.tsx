import useRequests from '@/hooks/useRequests';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { createPortal } from 'react-dom';
import LogEditForm from './LogEditForm';
import { DeleteIcon, EditIcon, FavoriteStar } from './MapIcons';
import 'react-tooltip/dist/react-tooltip.css';

interface Props {
  popupInfo: TravelLogTypeWithId;
}

export default function PopupInfo({ popupInfo }: Props) {
  const [updateLogForm, setUpdateLogForm] = useState<boolean>(false);
  const { deleteLogReq, addFavoriteReq } = useRequests();

  return (
    <>
      {updateLogForm && createPortal(<LogEditForm />, document.body)}
      <div className="flex flex-col mb-2">
        <p className="text-lg font-bold">{popupInfo.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <Tooltip
            id="favorite-log"
            style={{
              width: '80px',
              height: '30px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <button
            data-tooltip-id="favorite-log"
            data-tooltip-content="Favorite"
            data-tooltip-place="bottom"
            onClick={() => addFavoriteReq(popupInfo)}
          >
            <FavoriteStar isFavorited={popupInfo.favorited} />
          </button>
          <Tooltip
            id="update-log"
            style={{
              width: '80px',
              height: '30px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <button
            data-tooltip-id="update-log"
            data-tooltip-content="Update"
            data-tooltip-place="bottom"
            onClick={() => setUpdateLogForm(true)}
          >
            <EditIcon />
          </button>
          <Tooltip
            id="delete-log"
            style={{
              width: '80px',
              height: '30px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <button
            data-tooltip-id="delete-log"
            data-tooltip-content="Delete"
            data-tooltip-place="bottom"
            onClick={() => deleteLogReq(popupInfo)}
          >
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
      <div className="text-black rounded-md mt-3">
        <p className="mb-2 text-lg break-words">{popupInfo?.description}</p>
        <p className="text-base mt-3 text-slate-600">
          {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

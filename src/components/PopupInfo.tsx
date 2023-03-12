import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DeleteIcon } from './MapIcons';

interface PopupProps {
  popupInfo: TravelLogTypeWithId;
}

export default function PopupInfo({ popupInfo }: PopupProps) {
  const [popupState, setPopupState] = useState<string>('');
  const router = useRouter();

  const handleDeleteLog = async (log: TravelLogTypeWithId) => {
    try {
      const response = await fetch('/api/logs', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ logID: log._id }),
      });
      if (response.ok) {
        router.push({ pathname: '/', query: { name: 'remove-log' } }, '/');
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setPopupState(error.message);
      setTimeout(() => {
        setPopupState('');
      }, 1500);
    }
  };

  return (
    <>
      {popupState && (
        <div className="alert alert-error shadow-lg my-2">
          <div>
            <span>{popupState}</span>
          </div>
        </div>
      )}
      <div className="flex flex-row gap-1">
        <p className="text-lg font-bold mb-2">{popupInfo.title}</p>
        <div>
          <button
            className="btn-xs rounded-md"
            onClick={() => handleDeleteLog(popupInfo)}
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
            {popupInfo.rating}/10
          </figcaption>
        </figure>
      </div>
      <div className="bg-gray-800 p-2 text-white rounded-md">
        <p className="mb-2 text-lg">{popupInfo.description}</p>
        <p className="italic text-base">
          {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

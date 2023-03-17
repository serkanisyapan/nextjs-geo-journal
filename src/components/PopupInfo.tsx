import TravelLogContext from '@/context/TravelLogContext';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import LogEditForm from './LogEditForm';
import { DeleteIcon, EditIcon } from './MapIcons';

interface Props {
  popupInfo: TravelLogTypeWithId;
}

export default function PopupInfo({ popupInfo }: Props) {
  const [popupState, setPopupState] = useState<string>('');
  const [updateLogForm, setUpdateLogForm] = useState<boolean>(false);
  const { logs, setLogs, setAlert } = useContext(TravelLogContext);

  const handleDeleteLog = (logID: string) => {
    const deleteLog = logs.filter((log) => log._id.toString() !== logID);
    setLogs(deleteLog);
  };

  const deleteLogReq = async (log: TravelLogTypeWithId) => {
    try {
      const response = await fetch('/api/logs', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ logID: log._id }),
      });
      if (response.ok) {
        setAlert('Log got deleted succesfully.');
        const id = log._id.toString();
        handleDeleteLog(id);
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
      {updateLogForm && createPortal(<LogEditForm />, document.body)}

      {popupState && (
        <div className="alert alert-error shadow-lg my-2">
          <div>
            <span>{popupState}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col mb-2">
        <p className="text-lg font-bold">{popupInfo.title}</p>
        <div>
          <button onClick={() => setUpdateLogForm(true)} className="btn-xs">
            <EditIcon />
          </button>
          <button className="btn-xs" onClick={() => deleteLogReq(popupInfo)}>
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
        <p className="mb-2 text-lg">{popupInfo?.description}</p>
        <p className="italic text-base">
          {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

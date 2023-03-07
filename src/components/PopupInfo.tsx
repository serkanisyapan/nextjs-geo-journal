import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

interface PopupProps {
  popupInfo: TravelLogTypeWithId;
}

export default function PopupInfo({ popupInfo }: PopupProps) {
  return (
    <>
      <p className="text-lg font-bold mb-2">{popupInfo.title}</p>
      <div className="w-[280px] text-center">
        <figure className="mb-2">
          <img
            className="w-[280px] h-[160px] object-cover rounded-t-md"
            src={popupInfo.image}
            alt={popupInfo.title}
          />
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

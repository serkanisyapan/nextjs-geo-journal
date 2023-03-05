import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

interface PopupProps {
  popupInfo: TravelLogTypeWithId;
}

export default function Popups({ popupInfo }: PopupProps) {
  return (
    <>
      <p className="text-lg font-bold mb-2">{popupInfo.title}</p>
      <figure className="mb-2 rounded-md">
        <img
          className="w-full h-full object-cover"
          src={popupInfo.image}
          alt={popupInfo.title}
        />
        <figcaption className="text-center p-1 text-base bg-black text-white">
          {popupInfo.rating}/10
        </figcaption>
      </figure>
      <p className="mb-2 text-lg">{popupInfo.description}</p>
      <p className="italic text-base">
        {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
      </p>
    </>
  );
}

import { TravelLogTypeWithId } from '@/models/TravelLogValidator';

interface PopupProps {
  popupInfo: TravelLogTypeWithId;
}

export default function Popups({ popupInfo }: PopupProps) {
  return (
    <>
      <p className="text-lg font-bold">{popupInfo.title}</p>
      <figure className="mb-2">
        <img src={popupInfo.image} alt={popupInfo.title} />
        <figcaption className="text-center p-1 text-lg bg-black text-white">
          {popupInfo.rating}/10
        </figcaption>
      </figure>
      <p className="mb-2">{popupInfo.description}</p>
      <p className="italic text-start">
        {new Date(popupInfo.visitDate.toString()).toLocaleDateString()}
      </p>
    </>
  );
}

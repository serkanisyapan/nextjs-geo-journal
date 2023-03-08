import TravelLogContext from '@/context/TravelLogContext';
import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { useContext } from 'react';
import { Popup } from 'react-map-gl';
import PopupInfo from './PopupInfo';

interface LogPopupTypes {
  popupInfo: TravelLogTypeWithId;
}

export default function LogPopup({ popupInfo }: LogPopupTypes) {
  const { setPopupInfo } = useContext(TravelLogContext);
  return (
    <Popup
      closeOnClick={true}
      maxWidth="300px"
      style={{
        color: 'black',
        fontSize: '24px',
        fontFamily: 'monospace',
        padding: '0px',
        margin: '0px',
      }}
      anchor="top"
      longitude={Number(popupInfo.longitude)}
      latitude={Number(popupInfo.latitude)}
      onClose={() => setPopupInfo(null)}
    >
      <PopupInfo popupInfo={popupInfo} />
    </Popup>
  );
}

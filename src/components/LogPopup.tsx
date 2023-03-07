import { TravelLogTypeWithId } from '@/models/TravelLogValidator';
import { Popup } from 'react-map-gl';
import PopupInfo from './PopupInfo';

interface LogPopupTypes {
  popupInfo: TravelLogTypeWithId;
  handlePopupClose: () => void;
}

export default function LogPopup({
  popupInfo,
  handlePopupClose,
}: LogPopupTypes) {
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
      onClose={handlePopupClose}
    >
      <PopupInfo popupInfo={popupInfo} />
    </Popup>
  );
}

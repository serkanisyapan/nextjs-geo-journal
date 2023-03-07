import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl';

export default function MapControls() {
  return (
    <>
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
    </>
  );
}

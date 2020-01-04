import { GroundOverlayProps} from '.';
import { useSmartGroundOverlay } from './hooks';

const GroundOverlay = (props: GroundOverlayProps) => {
  useSmartGroundOverlay(props);

  return null;
}

export {GroundOverlay};

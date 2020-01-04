import { GroundOverlayProps} from '.';
import { useCreateGroundOverlayCtx } from './hooks';

const DumbGroundOverlay = (props: GroundOverlayProps) => {
  useCreateGroundOverlayCtx(props);

  return null;
}

export {DumbGroundOverlay};

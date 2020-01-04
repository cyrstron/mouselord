import { MarkerProps} from './';
import { useCreateMarkerCtx } from './hooks';

const DumbMarker = (props: MarkerProps) => {
  useCreateMarkerCtx(props);

  return null;
}

export {DumbMarker};

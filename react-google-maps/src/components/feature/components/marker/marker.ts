import { MarkerProps} from './';
import { useSmartMarker } from './hooks';

const Marker = (props: MarkerProps) => {
  useSmartMarker(props);

  return null;
}

export {Marker};

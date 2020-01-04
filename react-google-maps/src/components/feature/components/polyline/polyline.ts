import { PolylineProps} from './';
import {useSmartPolyline } from './hooks';

const Polyline = (props: PolylineProps) => {
  useSmartPolyline(props);

  return null;
}

export {Polyline};

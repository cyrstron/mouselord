import { PolygonProps} from './';
import { useSmartPolygon } from './hooks';

const Polygon = (props: PolygonProps) => {
  useSmartPolygon(props);

  return null;
}

export {Polygon};

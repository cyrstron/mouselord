import { PolygonProps} from './';
import { useCreatePolygonCtx } from './hooks';

const DumbPolygon = (props: PolygonProps) => {
  useCreatePolygonCtx(props);

  return null;
}

export {DumbPolygon};

import { PolylineProps} from './';
import { useCreatePolylineCtx } from './hooks';

const DumbPolyline = (props: PolylineProps) => {
  useCreatePolylineCtx(props);

  return null;
}

export {DumbPolyline};
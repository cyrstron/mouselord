import { CircleProps} from '.';
import { useCreateCircleCtx } from './hooks';

const DumbCircle = (props: CircleProps) => {
  useCreateCircleCtx(props);

  return null;
}

export {DumbCircle};

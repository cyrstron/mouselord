import { RectangleProps} from '.';
import { useCreateRectangleCtx } from './hooks';

const DumbRectangle = (props: RectangleProps) => {
  useCreateRectangleCtx(props);

  return null;
}

export {DumbRectangle};

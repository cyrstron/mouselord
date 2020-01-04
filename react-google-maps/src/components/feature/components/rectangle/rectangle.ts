import { RectangleProps} from '.';
import { useSmartRectangle } from './hooks';

const Rectangle = (props: RectangleProps) => {
  useSmartRectangle(props);

  return null;
}

export {Rectangle};

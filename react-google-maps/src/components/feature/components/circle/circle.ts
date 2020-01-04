import { CircleProps} from '.';
import { useSmartCircle } from './hooks';

const Circle = (props: CircleProps) => {
  useSmartCircle(props);

  return null;
}

export {Circle};

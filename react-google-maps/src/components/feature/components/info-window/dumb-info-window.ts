import { useDumbInfoWindow } from './hooks';
import { createPortal } from 'react-dom';
import { FullInfoWindowProps } from './info-window';

const DumbInfoWindow = ({children, ...props}: FullInfoWindowProps) => {
  const service = useDumbInfoWindow(props);
  
  if (!service) return null;

  const container = service.getContainer();

  return createPortal(children, container);
}

export {DumbInfoWindow};

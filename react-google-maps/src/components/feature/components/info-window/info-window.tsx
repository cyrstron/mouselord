import { InfoWindowProps} from '.';
import { useSmartInfoWindow } from './hooks';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type FullInfoWindowProps = InfoWindowProps & {
  children?: ReactNode
}

const InfoWindow = ({
  children, 
  ...props
}: FullInfoWindowProps) => {
  const service = useSmartInfoWindow(props);

  if (!service) return null;

  const container = service.getContainer();

  return createPortal(children, container);
}

export {InfoWindow};


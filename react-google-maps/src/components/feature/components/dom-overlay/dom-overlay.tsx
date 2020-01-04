import React from 'react';
import { useSmartDomOverlay } from './hooks';
import { Overlay } from './components/overlay';
import { DomOverlayProps } from '.';

const DomOverlay = ({children, ...props}: DomOverlayProps) => {
  const service = useSmartDomOverlay(props);

  return (
    <Overlay service={service}>
      {children}
    </Overlay>
  );
}

export {DomOverlay};

import React from 'react';
import { useDumbDomOverlay } from './hooks';
import { DomOverlayProps } from '.';
import { Overlay } from './components/overlay';

const DumbDomOverlay = ({children, ...props}: DomOverlayProps) => {
  const service = useDumbDomOverlay(props);

  return (
    <Overlay service={service}>
      {children}
    </Overlay>
  );
}

export {DumbDomOverlay};

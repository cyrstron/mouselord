import React from 'react';
import {useMapCtx} from '../hooks/use-map-ctx';
import { MapService } from '../services';

export interface WrappedProps {
  mapService: MapService;
}

export const withDumbMapCtx = <Props extends {}>(
  Wrapped: React.ComponentType<Props & WrappedProps>,
): React.ComponentType<Props> => {
  const WithDumbMapCtx = (props: Props) => {
    const service = useMapCtx();

    if (!service) return null;

    return (
      <Wrapped 
        mapService={service} 
        {...props}
      />
    )
  };

  return WithDumbMapCtx;
};

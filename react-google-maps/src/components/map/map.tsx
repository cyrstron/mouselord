import React, {ReactNode} from 'react';
import {useMapCreate} from './hooks/use-map-create';
import { MapProps } from '.';
import { useMapCtx } from './hooks/use-map-ctx';

export type MapComponentProps = MapProps & {
  children?: ReactNode | null;
};

export type Props = MapComponentProps;

const Map = ({
  children,
  className,
  ...props
}: MapComponentProps) => {
  const service = useMapCtx();
  const ref = useMapCreate(props);
  
  return (
    <div className={className} ref={ref} >
      {service && children}
    </div>
  )
};

export {Map};

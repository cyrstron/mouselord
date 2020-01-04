import React, {
  createContext, 
  ComponentType,
  Ref,
} from 'react';
import { MapService } from '../services';
import { MapProps } from '../';
import { useMap } from '../hooks/use-map';

export interface MapServiceProps {
  mapService?: MapService;
}

export interface CreateMapCtxValue {
  ref: Ref<HTMLDivElement>;
  setProps: (props: MapProps) => void;
};

export const MapCtx = createContext<MapService | undefined>(undefined);
export const CreateMapCtx = createContext<CreateMapCtxValue | undefined>(undefined);

const MapProvider = MapCtx.Provider;
const CreateMapProvider = CreateMapCtx.Provider;

export const MapConsumer = MapCtx.Consumer;
export const CreateMapConsumer = CreateMapCtx.Consumer;

export const withSmartMapCtx = <Props extends {}>(
  Wrapped: ComponentType<Props & MapServiceProps>
): ComponentType<Props> => (props: Props) => {
  const [ref, service, setProps] = useMap();

  const WithSmartMapCtx = (
    <CreateMapProvider value={{
      ref,
      setProps
    }}>
      <MapProvider
        value={service}
      >
        <Wrapped
          mapService={service}
          {...props as Props}
        />
      </MapProvider>
    </CreateMapProvider>
  );

  return WithSmartMapCtx;
}

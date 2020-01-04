import {useState, useEffect} from 'react';
import {useGoogleCtx} from '../../google-api';
import { useMapCtx, MapService } from '../../map';

export interface FeatureService<Props> {
  updateProps: (props: Props) => void;
  unmount: () => void;
}

export type CreateServiceFunction<
  Props, 
  Service extends FeatureService<Props>
> = (
  googleApi: Google, 
  mapService: MapService, 
  props: Props
) => Service

export const createUseFeature = <
  Props, 
  Service extends FeatureService<Props>
>(createService: CreateServiceFunction<Props, Service>) => (): [
  Service | undefined,
  (props: Props) => void
] => {
  const googleApi = useGoogleCtx();
  const mapService = useMapCtx();
  
  const [service, setService] = useState<Service | undefined>(undefined);

  useEffect(() => {
    return service && (() => {
      service.unmount();
    })
  }, [service]);
  
  const setProps = (props: Props) => {
    if (!googleApi || !mapService) return;

    if (!service) {
      const service = createService(googleApi, mapService, props);

      setService(service);
    } else {
      service.updateProps(props);
    }
  }

  return [service, setProps];
}
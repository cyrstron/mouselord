import {MapService} from '../../../map';
import { MapsObjectService } from '../../../../services/maps-object';
import { MapsObject } from 'services/maps-object/maps-object-service';

export interface EventlessFeature<Options> extends MapsObject<Options> {
  setMap: (map: google.maps.Map | null) => void;
}

export class EventlessFeatureService<
  Options,
  Feature extends EventlessFeature<Options>,
> extends MapsObjectService<Options, Feature> {
  mapService: MapService;

  constructor(
    googleApi: Google,
    mapService: MapService,
    object: Feature,
    options: Options,
  ) {
    super(
      googleApi, 
      object,
      options
    );

    this.mapService = mapService;
  }

  remove() {
    this.object.setMap(null);
  }

  unmount() {
    this.remove();
  }
}

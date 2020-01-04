import {MapService} from '../../../../map';
import { EventlessFeatureService } from '../../../services/eventless-feature-service';

export class DomOverlayService extends EventlessFeatureService<
  google.custom.DomOverlayOptions,
  google.custom.DomOverlay
> {
  constructor(
    googleApi: Google,
    mapService: MapService,
    options: google.custom.DomOverlayOptions,
  ) {
    super(
      googleApi, 
      mapService,
      new googleApi.custom.DomOverlay({
        map: mapService.getObject(),
        ...options
      }), 
      options
    );
  }

  getContainer(): HTMLDivElement | void {
    return this.object.getContainer();
  }
}

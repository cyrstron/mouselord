import {MapService} from '../../../map';
import { MapsEventableObjectService } from '../../../../services/maps-eventable-object';

export abstract class EventableFeatureService<
  Feature extends google.maps.Feature<
    EventName,
    Options,
    EventHandler
  >,
  EventName,
  Options,
  EventHandler,
  EventHandlerName extends string,
> extends MapsEventableObjectService<
  Feature,
  EventName,
  Options,
  EventHandler,
  EventHandlerName
> {
  mapService: MapService;
  
  constructor(
    google: Google,
    mapService: MapService,
    object: Feature,
    props: {
      options?: Options, 
      handlers?: {[key in EventHandlerName]: EventHandler}
    },
    eventNames: {
      [key in EventHandlerName]: EventName
    },  
    groupProps: (props: Options & {
      [key in EventHandlerName]?: EventHandler
    }) => {
      handlers?: {
        [key in EventHandlerName]: EventHandler;
      },
      options?: Options,
    }
  ) {
    super(google, object, props, eventNames, groupProps);

    this.mapService = mapService;
  }

  unmount() {
    this.object.setMap(null);

    super.unmount();
  }

  hide() {    
    this.object.setMap(null);
  }

  show() {    
    this.object.setMap(this.mapService.object);
  }
}

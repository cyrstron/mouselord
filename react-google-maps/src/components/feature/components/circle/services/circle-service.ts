import {MapService} from '../../../../map';
import { EventableFeatureService } from '../../../services/eventable-feature-service';
import { circleEventNames } from './event-names';
import { groupCircleProps } from './group-circle-props';
import {
  CircleEventName, 
  CircleEventHandler,
  CircleHandlerName
} from '../';

export class CircleService extends EventableFeatureService<
  google.maps.Circle,
  CircleEventName,
  google.maps.CircleOptions,
  CircleEventHandler,
  CircleHandlerName
> {
  constructor(
    google: Google,
    mapService: MapService,
    props: google.maps.CircleOptions & {[key in CircleHandlerName]?: CircleEventHandler}
  ) {
    super(
      google, 
      mapService,
      new google.maps.Circle({map: mapService.getObject(), ...props}),
      groupCircleProps(props),
      circleEventNames,
      groupCircleProps,
    );
  }
}

import {MapService} from '../../../../map';
import { EventableFeatureService } from '../../../services/eventable-feature-service';
import { rectangleEventNames } from './event-names';
import { groupRectangleProps } from './group-rectangle-props';
import {
  RectangleEventName, 
  RectangleEventHandler,
  RectangleHandlerName
} from '..';

export class RectangleService extends EventableFeatureService<
  google.maps.Rectangle,
  RectangleEventName,
  google.maps.RectangleOptions,
  RectangleEventHandler,
  RectangleHandlerName
> {
  constructor(
    google: Google,
    mapService: MapService,
    props: google.maps.RectangleOptions & {[key in RectangleHandlerName]?: RectangleEventHandler}
  ) {
    super(
      google, 
      mapService,
      new google.maps.Rectangle({map: mapService.getObject(), ...props}),
      groupRectangleProps(props),
      rectangleEventNames,
      groupRectangleProps,
    );
  }
}

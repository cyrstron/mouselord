import {MapService} from '../../../../map';
import { EventableFeatureService } from '../../../services/eventable-feature-service';
import { polygonEventNames } from './event-names';
import { groupPolygonProps } from './group-polygon-props';
import {
  PolygonEventName, 
  PolygonEventHandler,
  PolygonHandlerName
} from '..';

export class PolygonService extends EventableFeatureService<
  google.maps.Polygon,
  PolygonEventName,
  google.maps.PolygonOptions,
  PolygonEventHandler,
  PolygonHandlerName
> {
  constructor(
    google: Google,
    mapService: MapService,
    props: google.maps.PolygonOptions & {[key in PolygonHandlerName]?: PolygonEventHandler}
  ) {
    super(
      google, 
      mapService,
      new google.maps.Polygon({map: mapService.getObject(), ...props}),
      groupPolygonProps(props),
      polygonEventNames,
      groupPolygonProps,
    );
  }
}

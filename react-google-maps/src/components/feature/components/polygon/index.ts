import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import { FeatureEventName, FeatureHandlerName } from "../../services/eventable-feature-service";
import {PolygonService, createPolygonService} from './services';

export type PolygonEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

export type PolygonProps = google.maps.PolygonOptions & 
	{[key in PolygonHandlerName]?: PolygonEventHandler} & {
		paths: google.maps.LatLngLiteral[] | google.maps.LatLngLiteral[][]
	};
  
export type PolygonEventName = FeatureEventName;
	
export type PolygonHandlerName = FeatureHandlerName;

export type PolygonEventNames = {
	[key in PolygonHandlerName]: PolygonEventName;
};

export {Polygon} from './polygon';
export {DumbPolygon} from './dumb-polygon';

export const withSmartPolygonCtx = withSmartFeatureCtx<
  PolygonProps,
  PolygonService
>(createPolygonService);

export const withDumbPolygonCtx = withDumbFeatureCtx<PolygonProps, PolygonService>();

export {usePolygonCtx} from './hooks';

export {PolygonService};
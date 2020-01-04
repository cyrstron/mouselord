import { FeatureEventName, FeatureHandlerName } from "../../services/eventable-feature-service";
import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import {PolylineService, createPolylineService} from './services';

export type PolylineEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

export type PolylineProps = google.maps.PolylineOptions & 
	{[key in PolylineHandlerName]?: PolylineEventHandler} & {
		path: google.maps.LatLngLiteral[]
	};
  
export type PolylineEventName = FeatureEventName;
	
export type PolylineHandlerName = FeatureHandlerName;

export type PolylineEventNames = {
	[key in PolylineHandlerName]: PolylineEventName;
};

export {Polyline} from './polyline';
export {DumbPolyline} from './dumb-polyline';

export const withSmartPolylineCtx = withSmartFeatureCtx<
  PolylineProps,
  PolylineService
>(createPolylineService);

export const withDumbPolylineCtx = withDumbFeatureCtx<PolylineProps, PolylineService>();

export {usePolylineCtx} from './hooks';

export {PolylineService};
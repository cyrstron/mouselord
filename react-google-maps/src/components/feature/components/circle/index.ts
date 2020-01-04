import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import { FeatureEventName, FeatureHandlerName } from "../../services/eventable-feature-service";
import {CircleService, createCircleService} from './services';

export type CircleEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

export type CircleProps = google.maps.CircleOptions & 
	{[key in CircleHandlerName]?: CircleEventHandler};
  
export type CircleEventName = FeatureEventName |  
	'center_changed' |
	'radius_changed';
	
export type CircleHandlerName = FeatureHandlerName |
	'onCenterChanged' |
	'onRadiusChanged';

export type CircleEventNames = {
	[key in CircleHandlerName]: CircleEventName;
};

export {Circle} from './circle';
export {DumbCircle} from './dumb-circle';

export const withSmartCircleCtx = withSmartFeatureCtx<
  CircleProps,
  CircleService
>(createCircleService);

export const withDumbCircleCtx = withDumbFeatureCtx<CircleProps, CircleService>();

export {useCircleCtx} from './hooks';

export {CircleService};
import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import { FeatureEventName, FeatureHandlerName } from "../../services/eventable-feature-service";
import {RectangleService, createRectangleService} from './services';

export type RectangleEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

export type RectangleProps = google.maps.RectangleOptions & 
	{[key in RectangleHandlerName]?: RectangleEventHandler} & {
		paths: google.maps.LatLngLiteral[] | google.maps.LatLngLiteral[][]
	};
  
export type RectangleEventName = FeatureEventName |  
	'bounds_changed';
	
export type RectangleHandlerName = FeatureHandlerName |
	'onBoundChanged';

export type RectangleEventNames = {
	[key in RectangleHandlerName]: RectangleEventName;
};

export {Rectangle} from './rectangle';
export {DumbRectangle} from './dumb-rectangle';

export const withSmartRectangleCtx = withSmartFeatureCtx<
  RectangleProps,
  RectangleService
>(createRectangleService);

export const withDumbRectangleCtx = withDumbFeatureCtx<RectangleProps, RectangleService>();

export {useRectangleCtx} from './hooks';

export {RectangleService};
export {EventableFeatureService} from '../eventable-feature-service/eventable-feature-service';
export {featureEventNames} from './event-names';

import { 
  MapsObjectEventProps, 
  MapsObjectEventName, 
  MapsObjectHandlerName 
} from '../../../../services/maps-eventable-object/';

export type FeatureEventsProps =  MapsObjectEventProps & {
	onMouseDown?: google.maps.MouseEvent,
	onMouseMove?: google.maps.MouseEvent,
	onMouseUp?: google.maps.MouseEvent,    
}
  
export type FeatureEventName = MapsObjectEventName | 
	'mousedown' |
	'mousemove'	|
	'mouseup';
	
export type FeatureHandlerName = MapsObjectHandlerName |
	'onMouseDown' |
	'onMouseMove' | 
	'onMouseUp';

export type FeatureEventNames = {
	[key in FeatureHandlerName]: FeatureEventName;
}
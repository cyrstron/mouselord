import {mapsObjectEventNames} from '../../../../services/maps-eventable-object';
import { FeatureEventNames } from './';

export const featureEventNames: FeatureEventNames = {
	...mapsObjectEventNames,
	onMouseDown: 'mousedown',
	onMouseMove: 'mousemove',
	onMouseUp: 'mouseup'
};
  	
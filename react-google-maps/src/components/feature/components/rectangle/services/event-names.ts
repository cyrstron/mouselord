import {featureEventNames} from '../../../services/eventable-feature-service';
import { RectangleEventNames } from '../';

export const rectangleEventNames: RectangleEventNames = {
	...featureEventNames,
	onBoundChanged: 'bounds_changed',
};

import {featureEventNames} from '../../../services/eventable-feature-service';
import { CircleEventNames } from '../';

export const circleEventNames: CircleEventNames = {
	...featureEventNames,
	onCenterChanged: 'center_changed',
	onRadiusChanged: 'radius_changed',
};

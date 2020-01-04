import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import {GroundOverlayService, createGroundOverlayService} from './services';

export type GroundOverlayEventHandler = google.maps.MapMouseEventHandler;

export type GroundOverlaySettings = google.maps.GroundOverlayOptions & {
	bounds: google.maps.LatLngBoundsLiteral;
	url: string;
}

export type GroundOverlayProps = GroundOverlaySettings &	{
	[key in GroundOverlayHandlerName]?: GroundOverlayEventHandler
};
  
export type GroundOverlayEventName = 'click' | 'dblclick';
	
export type GroundOverlayHandlerName = 'onClick' |
	'onDblClick';

export type GroundOverlayEventNames = {
	[key in GroundOverlayHandlerName]: GroundOverlayEventName;
};

export {GroundOverlay} from './ground-overlay';
export {DumbGroundOverlay} from './dumb-ground-overlay';

export const withSmartGroundOverlayCtx = withSmartFeatureCtx<
  GroundOverlayProps,
  GroundOverlayService
>(createGroundOverlayService);

export const withDumbGroundOverlayCtx = withDumbFeatureCtx<GroundOverlayProps, GroundOverlayService>();

export {useGroundOverlayCtx} from './hooks';

export {GroundOverlayService};
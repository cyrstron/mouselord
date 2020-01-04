import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import {InfoWindowService, createInfoWindowService} from './services';
import { MarkerService } from '../marker';

export type InfoWindowEventHandler = google.maps.MapMouseEventHandler;

export type InfoWindowSettings = google.maps.InfoWindowOptions & {
	content: undefined;
	open: boolean;
	anchor: MarkerService;
}

export type InfoWindowProps = InfoWindowSettings &	{
	[key in InfoWindowHandlerName]?: InfoWindowEventHandler
};
  
export type InfoWindowEventName = 'closeclick' | 
	'content_changed' |
	'domready' |
	'position_changed' |
	'zindex_changed';
	
export type InfoWindowHandlerName = 'onCloseClick' | 
	'onContentChanged' |
	'onDomReady' |
	'onPositionChanged' |
	'onZIndexChanged';

export type InfoWindowEventNames = {
	[key in InfoWindowHandlerName]: InfoWindowEventName;
};

export {InfoWindow} from './info-window';
export {DumbInfoWindow} from './dumb-info-window';

export const withSmartInfoWindowCtx = withSmartFeatureCtx<
  InfoWindowProps,
  InfoWindowService
>(createInfoWindowService);

export const withDumbInfoWindowCtx = withDumbFeatureCtx<InfoWindowProps, InfoWindowService>();

export {useInfoWindowCtx} from './hooks';

export {InfoWindowService};
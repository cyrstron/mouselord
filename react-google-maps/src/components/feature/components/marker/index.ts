import {MarkerService, createMarkerService} from './services';
import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import { FeatureEventName, FeatureHandlerName } from "../../services/eventable-feature-service";

export type MarkerEventHandler = google.maps.MapEventHandler | 
  google.maps.MapMouseEventHandler;

export type MarkerProps = google.maps.MarkerOptions & 
  {[key in MarkerHandlerName]?: MarkerEventHandler} & {
    position: google.maps.LatLngLiteral;
    title: string;
  };

export type MarkerEventName = FeatureEventName |
  'animation_changed' | 
  'clickable_changed' | 
  'cursor_changed' | 
  'draggable_changed' | 
  'flat_changed' | 
  'icon_changed' | 
  'mousedown' | 
  'mouseup' | 
  'position_changed' | 
  'shape_changed' | 
  'title_changed' | 
  'visible_changed' | 
  'zindex_changed';
  
export type MarkerHandlerName = FeatureHandlerName |
  'onAnimationChanged' | 
  'onClickableChanged' | 
  'onCursorChanged' | 
  'onDraggableChanged' | 
  'onFlatChanged' | 
  'onIconChanged' | 
  'onMouseDown' | 
  'onMouseUp' | 
  'onPositionChanged' | 
  'onShapeChanged' | 
  'onTitleChanged' | 
  'onVisibleChanged' | 
  'onZIndexChanged';

export type MarkerEventNames = {
  [key in MarkerHandlerName]: MarkerEventName;
}

export {Marker} from './marker';
export {DumbMarker} from './dumb-marker';

export const withSmartMarkerCtx = withSmartFeatureCtx<
  MarkerProps,
  MarkerService
>(createMarkerService);

export const withDumbMarkerCtx = withDumbFeatureCtx<MarkerProps, MarkerService>();

export {useMarkerCtx} from './hooks';

export {MarkerService};
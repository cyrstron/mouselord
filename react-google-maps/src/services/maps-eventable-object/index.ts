export {MapsEventableObjectService} from './maps-eventable-object-service';
export {mapsObjectEventNames} from './event-names';

export type MapsObjectHandlerName = 'onClick' |
  'onDblClick' |
  'onDrag' |
  'onDragStart' |
  'onDragEnd' |
  'onMouseOut' |
  'onMouseOver' |
  'onRightClick';

export type MapsObjectEventName = 'click' |
  'dblclick' |
  'drag' |
  'dragstart' |
  'dragend' |
  'mouseout' |
  'mouseover' |
  'rightclick';

export interface MapsObjectEventProps {
  onClick?: google.maps.MapMouseEventHandler;
  onDblClick?: google.maps.MapMouseEventHandler;
  onDrag?: google.maps.MapMouseEventHandler;
  onDragStart?: google.maps.MapMouseEventHandler;
  onDragEnd?: google.maps.MapMouseEventHandler;
  onMouseOut?: google.maps.MapMouseEventHandler;
  onMouseOver?: google.maps.MapMouseEventHandler;
  onRightClick?: google.maps.MapMouseEventHandler;
}
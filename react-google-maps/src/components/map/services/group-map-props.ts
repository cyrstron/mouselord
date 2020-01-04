import {filterObject} from '../../../services/maps-object';
import { MapHandlerName, MapEventHandler, MapEventsProps } from '../';

export interface SortedMapProps {
  options?: google.maps.MapOptions;
  handlers?: {[key in MapHandlerName]: MapEventHandler};
}

export const groupMapProps = ({
  onBoundsChanged,
  onCenterChanged,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onHeadingChanged,
  onIdle,
  onMaptypeIdChanged,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onProjectionChanged,
  onRightClick,
  onTilesLoaded,
  onTiltChanged,
  onZoomChanged,
  ...options
}: MapEventsProps & google.maps.MapOptions): SortedMapProps => {
  const result: SortedMapProps = {
    options,
  };

  const handlers = filterObject<MapEventHandler>({
    onBoundsChanged,
    onCenterChanged,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onHeadingChanged,
    onIdle,
    onMaptypeIdChanged,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onProjectionChanged,
    onRightClick,
    onTilesLoaded,
    onTiltChanged,
    onZoomChanged,
  }) as {[key in MapHandlerName]: MapEventHandler} | undefined;

  if (handlers) {
    result.handlers = handlers;
  }

  return result;
};

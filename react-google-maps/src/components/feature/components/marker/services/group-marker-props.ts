import {filterObject} from '../../../../../services/maps-object';
import {  
  MarkerHandlerName, 
  MarkerEventHandler 
} from '..';

export interface SortedMarkerProps {
  options?: google.maps.MarkerOptions;
  handlers?: {[key in MarkerHandlerName]: MarkerEventHandler};
}

export const groupMarkerProps = ({
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseOut,
  onMouseOver,
  onRightClick,
  onAnimationChanged,
  onClickableChanged,
  onCursorChanged,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onMouseDown,
  onMouseUp,
  onPositionChanged,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZIndexChanged,
  ...options
}: {[key in MarkerHandlerName]?: MarkerEventHandler} & google.maps.MarkerOptions): SortedMarkerProps => {
  const result: SortedMarkerProps = {
    options,
  };

  const handlers = filterObject<MarkerEventHandler>({
    onAnimationChanged,
    onClick,
    onClickableChanged,
    onCursorChanged,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onDraggableChanged,
    onFlatChanged,
    onIconChanged,
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onPositionChanged,
    onRightClick,
    onShapeChanged,
    onTitleChanged,
    onVisibleChanged,
    onZIndexChanged,
  });

  if (handlers) {
    result.handlers = handlers as {[key in MarkerHandlerName]: MarkerEventHandler};
  }

  return result;
};

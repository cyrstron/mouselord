import {filterObject} from '../../../../../services/maps-object';
import { 
  RectangleEventHandler, 
  RectangleHandlerName
} from '..';

export interface SortedRectangleProps {
  options?: google.maps.RectangleOptions;
  handlers?: {[key in RectangleHandlerName]: RectangleEventHandler};
}

export const groupRectangleProps = ({
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseOut,
  onMouseOver,
  onRightClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onBoundChanged,
  ...options
}: {[key in RectangleHandlerName]?: RectangleEventHandler} & google.maps.RectangleOptions): SortedRectangleProps => {
  const result: SortedRectangleProps = {
    options,
  };

  const handlers = filterObject<RectangleEventHandler>({
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
    onBoundChanged,
  });

  if (handlers) {
    result.handlers = handlers as {[key in RectangleHandlerName]: RectangleEventHandler};
  }

  return result;
};

import {filterObject} from '../../../../../services/maps-object';
import { 
  CircleEventHandler, 
  CircleHandlerName
} from '../';

export interface SortedCircleProps {
  options?: google.maps.CircleOptions;
  handlers?: {[key in CircleHandlerName]: CircleEventHandler};
}

export const groupCircleProps = ({
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
  onCenterChanged,
  onRadiusChanged,
  ...options
}: {[key in CircleHandlerName]?: CircleEventHandler} & google.maps.CircleOptions): SortedCircleProps => {
  const result: SortedCircleProps = {
    options,
  };

  const handlers = filterObject<CircleEventHandler>({
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
    onCenterChanged,
    onRadiusChanged,
  });

  if (handlers) {
    result.handlers = handlers as {[key in CircleHandlerName]: CircleEventHandler};
  }

  return result;
};

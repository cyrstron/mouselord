import {useContext} from 'react';
import {MapCtx} from '../hocs/with-smart-map-ctx';

export const useMapCtx = (
) => {
  return useContext(MapCtx);
}
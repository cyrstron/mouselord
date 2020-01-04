import { ReactNode, ComponentType } from 'react';
import { TilePayload } from './services/tiles-overlay-service';
import { 
  TilesOverlayService, 
  CreateTilesOverlayServiceProps, 
  createTilesOverlayService 
} from './services';
import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';

export type TilesOverlayProps = google.custom.TilesOverlayOptions & {
  children?: (props: {
    tileCoord: google.maps.Point;
    zoom: number;
    width: number;
    height: number;
    data?: any;
  }) => ReactNode | null;
  TileComponent?: ComponentType<{
    tileCoord: google.maps.Point;
    zoom: number;
    width: number;
    height: number;
    data?: any;
  }>;  
  extendPayload?: (payload: TilePayload & {
    width: number;
    height: number;
  }) => Promise<any>,
  width: number;
  height?: number;
  watchProps?: any[];
}

export {TilesOverlay} from './tiles-overlay';
export {DumbTilesOverlay} from './dumb-tiles-overlay';

export const withSmartTilesOverlayCtx = withSmartFeatureCtx<
  CreateTilesOverlayServiceProps, 
  TilesOverlayService
>(createTilesOverlayService);

export const withDumbTilesOverlayCtx = withDumbFeatureCtx<
  CreateTilesOverlayServiceProps, 
  TilesOverlayService
>();

export {useTilesOverlayCtx} from './hooks';

export {TilesOverlayService};
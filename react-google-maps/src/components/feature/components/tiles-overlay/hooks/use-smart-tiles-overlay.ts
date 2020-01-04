import { createUseFeature, createUseUpdateFeature } from "../../../hooks";
import { 
  TilesOverlayService, 
  createTilesOverlayService, 
  CreateTilesOverlayServiceProps 
} from "../services";
import { TilePayload, ExtendPayloadCallback } from "../services/tiles-overlay-service";
import { useTilesOverlayState } from "./use-tiles-overlay-state";

export const useTilesOverlay = createUseFeature<
  CreateTilesOverlayServiceProps, 
  TilesOverlayService
>(createTilesOverlayService);

export const useUpdateTilesOverlay = createUseUpdateFeature<CreateTilesOverlayServiceProps>();

export const useSmartTilesOverlay = <ExtendedPayload = any>(
  props: google.custom.TilesOverlayOptions & {
    extendPayload?: ExtendPayloadCallback<ExtendedPayload>;
    watchProps?: any[];
  }
): Map<Node, TilePayload & {data?: ExtendedPayload}> => {
  const [service, setProps] = useTilesOverlay();

  const [tiles, setTiles] = useTilesOverlayState<ExtendedPayload>(service, props);

  useUpdateTilesOverlay({
    setTiles,
    ...props
  }, setProps);

  return tiles;
}
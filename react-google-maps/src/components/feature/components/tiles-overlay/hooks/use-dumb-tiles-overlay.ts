import { createUseCreateFeatureCtx, createUseFeatureCtx } from "../../../hooks";
import { TilesOverlayService, CreateTilesOverlayServiceProps } from "../services";
import { TilePayload, ExtendPayloadCallback } from "../services/tiles-overlay-service";
import { useTilesOverlayState } from "./use-tiles-overlay-state";

export const useCreateTilesOverlayCtx = createUseCreateFeatureCtx<
  CreateTilesOverlayServiceProps
>();

export const useTilesOverlayCtx = createUseFeatureCtx<
  TilesOverlayService
>();

export const useDumbTilesOverlay = <ExtendedPayload = any>(
  props: google.custom.TilesOverlayOptions & {
    extendPayload?: ExtendPayloadCallback<ExtendedPayload>;
    watchProps?: any[];
  }
): Map<Node, TilePayload & {data?: ExtendedPayload}> => {
  const service = useTilesOverlayCtx();

  const [tiles, setTiles] = useTilesOverlayState<ExtendedPayload>(service, props);

  useCreateTilesOverlayCtx({
    setTiles,
    ...props
  });

  return tiles;
}
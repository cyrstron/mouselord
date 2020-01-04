import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { TilesOverlayService, SetTilesCallback, ExtendPayloadCallback } from "./tiles-overlay-service";

export interface CreateTilesOverlayServiceProps<
  ExtendedPayload = any
> extends google.custom.TilesOverlayOptions {
  setTiles: SetTilesCallback<ExtendedPayload>,
  extendPayload?: ExtendPayloadCallback<ExtendedPayload>
};

export const createTilesOverlayService: CreateServiceFunction<
  CreateTilesOverlayServiceProps,
  TilesOverlayService
> = (
  googleApi,
  mapService,
  {extendPayload, setTiles, ...props}
) => {
  return new TilesOverlayService(googleApi, mapService, props, setTiles, extendPayload);
}
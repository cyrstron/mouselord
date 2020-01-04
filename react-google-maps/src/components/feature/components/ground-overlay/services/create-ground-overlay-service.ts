import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { GroundOverlayProps } from "..";
import { GroundOverlayService } from "./ground-overlay-service";

export const createGroundOverlayService: CreateServiceFunction<
  GroundOverlayProps, 
  GroundOverlayService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new GroundOverlayService(googleApi, mapService, props);
}
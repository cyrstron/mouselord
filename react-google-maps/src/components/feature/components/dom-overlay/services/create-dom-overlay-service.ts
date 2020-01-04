import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { DomOverlayService } from "./dom-overlay-service";

export const createDomOverlayService: CreateServiceFunction<
  google.custom.DomOverlayOptions, 
  DomOverlayService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new DomOverlayService(googleApi, mapService, props);
}
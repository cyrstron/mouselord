import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { MarkerProps } from "../";
import { MarkerService } from "./marker-service";

export const createMarkerService: CreateServiceFunction<
  MarkerProps, 
  MarkerService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new MarkerService(googleApi, mapService, props);
}
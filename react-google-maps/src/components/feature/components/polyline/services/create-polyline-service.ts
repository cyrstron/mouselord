import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { PolylineProps } from "../";
import { PolylineService } from "./polyline-service";

export const createPolylineService: CreateServiceFunction<
  PolylineProps, 
  PolylineService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new PolylineService(googleApi, mapService, props);
}
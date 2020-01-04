import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { PolygonProps } from "../";
import { PolygonService } from "./polygon-service";

export const createPolygonService: CreateServiceFunction<
  PolygonProps, 
  PolygonService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new PolygonService(googleApi, mapService, props);
}
import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { RectangleProps } from "..";
import { RectangleService } from "./rectangle-service";

export const createRectangleService: CreateServiceFunction<
  RectangleProps, 
  RectangleService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new RectangleService(googleApi, mapService, props);
}
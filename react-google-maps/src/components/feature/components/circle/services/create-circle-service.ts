import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { CircleProps } from "..";
import { CircleService } from "./circle-service";

export const createCircleService: CreateServiceFunction<
  CircleProps, 
  CircleService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new CircleService(googleApi, mapService, props);
}
import { CreateServiceFunction } from "../../../hooks/create-use-feature";
import { InfoWindowProps } from "..";
import { InfoWindowService } from "./info-window-service";

export const createInfoWindowService: CreateServiceFunction<
  InfoWindowProps, 
  InfoWindowService
> = (
  googleApi,
  mapService,
  props,
) => {
  return new InfoWindowService(googleApi, mapService, props);
}
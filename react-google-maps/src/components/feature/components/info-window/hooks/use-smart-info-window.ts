import { createUseFeature, createUseUpdateFeature } from "../../../hooks";
import { InfoWindowService, createInfoWindowService } from "../services";
import { InfoWindowSettings } from "..";
import { useMarkerCtx } from "../../marker";

export const useInfoWindow = createUseFeature<
  InfoWindowSettings, 
  InfoWindowService
>(createInfoWindowService);

export const useUpdateInfoWindow = createUseUpdateFeature<
  InfoWindowSettings
>();

export const useSmartInfoWindow = (
  props: InfoWindowSettings
): InfoWindowService | undefined => {
  const markerService = useMarkerCtx();

  const [service, setProps] = useInfoWindow();

  useUpdateInfoWindow({
    anchor: markerService,
    ...props
  }, setProps);

  return service;
}
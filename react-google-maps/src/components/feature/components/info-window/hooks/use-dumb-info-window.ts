import { createUseCreateFeatureCtx, createUseFeatureCtx } from "../../../hooks";
import { InfoWindowService } from "../services";
import { InfoWindowSettings } from "..";
import { useMarkerCtx } from "../../marker";

export const useCreateInfoWindowCtx = createUseCreateFeatureCtx<
  InfoWindowSettings
>();

export const useInfoWindowCtx = createUseFeatureCtx<
  InfoWindowService
>();

export const useDumbInfoWindow = (
  props: InfoWindowSettings
): InfoWindowService | undefined => {
  const markerService = useMarkerCtx();
    
  useCreateInfoWindowCtx({
    anchor: markerService,
    ...props
  });

  const service = useInfoWindowCtx();

  return service;
}
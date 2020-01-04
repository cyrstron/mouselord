import { createUseFeature, createUseUpdateFeature } from "../../../hooks";
import { DomOverlayService, createDomOverlayService } from "../services";

export const useDomOverlay = createUseFeature<
  google.custom.DomOverlayOptions, 
  DomOverlayService
>(createDomOverlayService);

export const useUpdateDomOverlay = createUseUpdateFeature<
  google.custom.DomOverlayOptions
>();

export const useSmartDomOverlay = (
  props: google.custom.DomOverlayOptions
): DomOverlayService | undefined => {
  const [service, setProps] = useDomOverlay();

  useUpdateDomOverlay(props, setProps);

  return service;
}
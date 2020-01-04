import { createUseCreateFeatureCtx, createUseFeatureCtx } from "../../../hooks";
import { DomOverlayService } from "../services";

export const useCreateDomOverlayCtx = createUseCreateFeatureCtx<
  google.custom.DomOverlayOptions
>();

export const useDomOverlayCtx = createUseFeatureCtx<
  DomOverlayService
>();

export const useDumbDomOverlay = (
  props: google.custom.DomOverlayOptions
): DomOverlayService | undefined => {
  useCreateDomOverlayCtx(props);

  const service = useDomOverlayCtx();

  return service;
}
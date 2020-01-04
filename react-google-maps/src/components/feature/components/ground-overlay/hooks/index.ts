import { 
  createUseCreateFeatureCtx, 
  createUseFeatureCtx,
  createUseSmartFeature
} from "../../../hooks";
import { createGroundOverlayService, GroundOverlayService } from "../services";
import { GroundOverlayProps} from "../";

export const useSmartGroundOverlay = createUseSmartFeature<
  GroundOverlayProps, 
  GroundOverlayService
>(createGroundOverlayService);

export const useCreateGroundOverlayCtx = createUseCreateFeatureCtx<
  GroundOverlayProps
>();

export const useGroundOverlayCtx = createUseFeatureCtx<
  GroundOverlayService
>();

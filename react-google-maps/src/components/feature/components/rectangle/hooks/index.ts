import { 
  createUseCreateFeatureCtx, 
  createUseFeatureCtx,
  createUseSmartFeature
} from "../../../hooks";
import { createRectangleService, RectangleService } from "../services";
import { RectangleProps} from "../";

export const useSmartRectangle = createUseSmartFeature<
  RectangleProps, 
  RectangleService
>(createRectangleService);

export const useCreateRectangleCtx = createUseCreateFeatureCtx<
  RectangleProps
>();

export const useRectangleCtx = createUseFeatureCtx<
  RectangleService
>();

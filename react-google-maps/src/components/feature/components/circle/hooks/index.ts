import { 
  createUseCreateFeatureCtx, 
  createUseFeatureCtx,
  createUseSmartFeature
} from "../../../hooks";
import { createCircleService, CircleService } from "../services";
import { CircleProps} from "../";

export const useSmartCircle = createUseSmartFeature<
  CircleProps, 
  CircleService
>(createCircleService);

export const useCreateCircleCtx = createUseCreateFeatureCtx<
  CircleProps
>();

export const useCircleCtx = createUseFeatureCtx<
  CircleService
>();

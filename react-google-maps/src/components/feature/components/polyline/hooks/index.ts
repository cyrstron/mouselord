import { 
  createUseCreateFeatureCtx, 
  createUseFeatureCtx, 
  createUseSmartFeature
} from "../../../hooks";
import { createPolylineService, PolylineService } from "../services";
import { PolylineProps} from "..";

export const useSmartPolyline = createUseSmartFeature<
  PolylineProps, 
  PolylineService
>(createPolylineService);

export const useCreatePolylineCtx = createUseCreateFeatureCtx<
  PolylineProps
>();

export const usePolylineCtx = createUseFeatureCtx<
  PolylineService
>();

import { 
  createUseCreateFeatureCtx, 
  createUseFeatureCtx,
  createUseSmartFeature
} from "../../../hooks";
import { createPolygonService, PolygonService } from "../services";
import { PolygonProps} from "..";

export const useSmartPolygon = createUseSmartFeature<
  PolygonProps, 
  PolygonService
>(createPolygonService);

export const useCreatePolygonCtx = createUseCreateFeatureCtx<
  PolygonProps
>();

export const usePolygonCtx = createUseFeatureCtx<
  PolygonService
>();

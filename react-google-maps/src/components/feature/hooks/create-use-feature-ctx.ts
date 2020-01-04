import {useContext} from 'react';
import { FeatureCtx } from '../hocs/with-smart-feature-ctx';

export const createUseFeatureCtx = <Service>() => () => {
  const service = useContext(FeatureCtx) as Service | undefined;

  return service;
}
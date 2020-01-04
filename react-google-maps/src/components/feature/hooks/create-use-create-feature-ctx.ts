import {useContext} from 'react';
import { CreateFeatureCtx } from '../hocs/with-smart-feature-ctx';
import { createUseUpdateFeature } from './create-use-update-feature-ctx';

export const createUseCreateFeatureCtx = <Props>() => {
  const useUpdateFeature = createUseUpdateFeature<Props>();

  return (
    props: Props
  ): void => {
    const setProps = useContext(CreateFeatureCtx);

    useUpdateFeature(props, setProps);
  }
}
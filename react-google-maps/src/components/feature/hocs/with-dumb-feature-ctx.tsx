import React, {ComponentType} from 'react';
import { FeatureService } from '../hooks/create-use-feature';
import { createUseFeatureCtx } from '../hooks';

export const withDumbFeatureCtx = <
  Props, 
  Service extends FeatureService<Props>
>() => {
  const useFeatureCtx = createUseFeatureCtx<Service>();

  const WithDumbFeatureCtx = <
    WrappedProps extends {}
  >(
  Wrapped: ComponentType<WrappedProps & {
    service: Service
  }>) => (props: WrappedProps) => {
    const service = useFeatureCtx();

    if (!service) return null;

    return (
      <Wrapped
        service={service}
        {...props}
      />
    );
  }

  return WithDumbFeatureCtx;
}
import React, {
  createContext, 
  ComponentType,
} from 'react';
import { createUseFeature, FeatureService, CreateServiceFunction } from '../hooks/create-use-feature';

export interface FeatureServiceProps<Service> {
  service?: Service;
}

export interface CreateFeatureProps<Props> {
  setProps: (props: Props) => void;
};

export const FeatureCtx = createContext<any | undefined>(undefined);
export const CreateFeatureCtx = createContext<((props: any) => void) | undefined>(undefined);

const FeatureProvider = FeatureCtx.Provider;
const CreateFeatureProvider = CreateFeatureCtx.Provider;

export const FeatureConsumer = FeatureCtx.Consumer;
export const CreateFeatureConsumer = CreateFeatureCtx.Consumer;

export const withSmartFeatureCtx = <
  Props, 
  Service extends FeatureService<Props>
>(
  createService: CreateServiceFunction<Props, Service>
) => <
  WrappedProps extends {}
>(
  Wrapped: ComponentType<WrappedProps>
) => {
  const useFeature = createUseFeature<Props, Service>(createService);

  const WithSmartFeatureCtx = (props: WrappedProps) => {
    const [service, setProps] = useFeature();

    return (
      <CreateFeatureProvider value={setProps}>
        <FeatureProvider
          value={service}
        >
          <Wrapped
            service={service}
            {...props}
          />
        </FeatureProvider>
      </CreateFeatureProvider>
    );
  }

  return WithSmartFeatureCtx;
}

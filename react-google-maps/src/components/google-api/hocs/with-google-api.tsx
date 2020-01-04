import React, {ComponentType} from 'react';
import { useGoogleCtx } from '../hooks/use-google-ctx';

export interface GoogleApiProps {
  googleApi: Google;
}

export const withGoogleApi = <Props extends {}>(
  Wrapped: ComponentType<GoogleApiProps & Props>
) => {
  const WithGoogleApi = (props: Props) => {
    const googleApi = useGoogleCtx();

    if (!googleApi) return null;

    return (
      <Wrapped 
        googleApi={googleApi}
        {...props}
      />
    )
  };

  return WithGoogleApi;
}

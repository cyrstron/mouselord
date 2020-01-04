import React, { ReactNode, ComponentType} from 'react';
import { useGoogleApi } from './hooks/use-google-api';
import { GoogleApiCtxProvider } from './hooks/use-google-ctx';
import { GoogleApiProps } from './services/google-api-service';

export type GoogleProps = GoogleApiProps & {
  children: ReactNode;
  ErrorMessage?: ComponentType<{error: Error}>;
  Loader?: ComponentType<{}>;
}

export interface GoogleState {
  isPending: boolean;
  googleApi?: Google;
  err: Error | null;
}

const GoogleApiProvider = ({
  children,
  ErrorMessage,
  Loader,
  ...props
}: GoogleProps) => {
  const {
    isPending,
    err,
    googleApi
  } = useGoogleApi(props);

  if (isPending) return Loader ? (
    <Loader />
  ) : null;

  if (err) return ErrorMessage ? (
    <ErrorMessage error={err} />
  ): null;

  return (    
    <GoogleApiCtxProvider
      value={googleApi}
    >
      {children}
    </GoogleApiCtxProvider>
  )
}

export {GoogleApiProvider};
import { useContext, createContext } from "react";

export interface GoogleState {
  isPending: boolean;
  googleApi?: Google;
  err: Error | null;
}

const GoogleApiCtx = createContext<Google | undefined>(undefined);

export const GoogleApiCtxProvider = GoogleApiCtx.Provider;

export function useGoogleCtx(): Google | undefined {  
  return useContext(GoogleApiCtx);
}
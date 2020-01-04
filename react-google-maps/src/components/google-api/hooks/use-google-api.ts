import { useState, useEffect } from "react";
import { GoogleApiService, GoogleApiProps } from "../services/google-api-service";

export interface GoogleState {
  isPending: boolean;
  googleApi?: Google;
  err: Error | null;
}

export function useGoogleApi(props: GoogleApiProps): GoogleState {  
  const [googleApi, setGoogleApi] = useState<Google | undefined>(undefined);
  const [err, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  async function loadApi() {
    const googleService = new GoogleApiService(props);

    try {
      const googleApi = await googleService.loadApi();

      setGoogleApi(googleApi);
    } catch (err) {
      console.error(err);

      setError(err);
    } 

    setIsPending(false);
  }

  useEffect(() => {
    loadApi();
  }, Object.values(props));

  return {
    googleApi,
    err,
    isPending,
  }
}
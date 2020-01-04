import { GoogleApiOptions } from "../google-api-service";

export const buildUrlString = ({
  apiKey,
  geometry,
  drawing,
  places,
  visualization,
  language,
  region,
  version,
}:GoogleApiOptions): string => {
  const libParams: {[key in string]?: boolean} = {  
    geometry,
    drawing,
    places,
    visualization,
  };

  const libraries = Object.keys(libParams)
    .filter((key) => !!libParams[key])
    .join(',') || undefined;

  const queryParams: {[key in string]?: string} = {
    key: apiKey,
    v: version,
    region,
    language,
    libraries,
  };

  const paramsString = Object.keys(queryParams)
    .filter((key) => !!queryParams[key])
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&');

  return `https://maps.google.com/maps/api/js?${paramsString}`;
}
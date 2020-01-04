import { extendGoogleApi } from './utils/extentions';
import { buildUrlString } from './utils/build-url-string';

declare global {
  interface Window {
    google: Google;
  }
}

export interface GoogleApiOptions {
  apiKey: string;
  geometry?: boolean;
  drawing?: boolean;
  places?: boolean;
  visualization?: boolean;
  language?: string;
  region?: string;
  version?: string;
};

export interface GoogleLoadOptions {
  load: () => Promise<Google>;
}

export interface GoogleProxyOptions {
  proxy: string;
}

export type GoogleLoadSettings = GoogleApiOptions | GoogleLoadOptions | GoogleProxyOptions;

export type GoogleApiProps = GoogleLoadSettings & {
  custom?: boolean;
  extend?: (googleApi: Google) => void;
}

export class GoogleApiService {
  url?: string;
  proxy?: string;
  load?: () => Promise<Google>;

  custom: boolean;
  extend?: (googleApi: Google) => void;

  constructor({
    custom = true,
    extend,
    ...props
  }: GoogleApiProps) {
    if ('proxy' in props) {
      this.proxy = props.proxy;
    } else if ('load' in props) {
      this.load = props.load;
    } else {
      this.url = buildUrlString(props);
    }

    this.custom = custom;
    this.extend = extend;
  }

  loadApi(): Promise<Google> {
    if (window.google) return Promise.resolve(window.google);

    if (this.load) {
      return this.load();
    }

    const src = this.proxy || this.url;

    if (!src) {
      throw new Error('You must provide Google API key, proxy url or load function');
    }

    const script: HTMLScriptElement = document.createElement('script');

    script.type = 'text/javascript';    
    script.src = src

    document.body.append(script);

    return new Promise<Google>((res, rej) => {
      script.addEventListener('load', () => {     
        const {google} = window;

        extendGoogleApi(google);

        res(google);
      });

      script.addEventListener('error', (): void => {
        rej(new Error('Failed to load resource'));
      });
    });
  }

  extendApi(google: Google): void {
    if (!this.custom) return;

    extendGoogleApi(google);

    if (!this.extend) return;

    this.extend(google);
  }
}

import { pickUpdated } from "./pick-updated";

export interface MapsObject<Options> {
  setOptions?: (options: Options) => void;
}

export abstract class MapsObjectService<
  MapsObjectOptions,
  MapObject extends MapsObject<MapsObjectOptions>
> {
  google: Google;
  maps: google.Maps;
  object: MapObject;

  options: MapsObjectOptions;

  constructor(
    google: Google,
    object: MapObject,
    options?: MapsObjectOptions,
  ) {
    this.google = google;
    this.maps = google.maps;
    this.object = object;
    this.options = options || {} as MapsObjectOptions;
  }  

  setOptions(options: MapsObjectOptions | undefined) {
    if (!options || !this.object.setOptions) return;

    this.options = {
      ...this.options,
      ...options,
    };

    this.object.setOptions(options);
  }

  getObject(): MapObject {
    return this.object;
  }

  setProps(props: MapsObjectOptions) {
    this.setOptions(props);
  }

  updateProps(props: MapsObjectOptions) {    
    this.updateOptions(props);
  }

  updateOptions(
    options: MapsObjectOptions & {
      [key: string]: any,
    } | undefined,
  ) {
    if (!this.options || !options) return;

    const updatedOptions = pickUpdated<MapsObjectOptions>(this.options, options);

    if (!updatedOptions) return;

    this.setOptions(updatedOptions);
  }

  abstract unmount(): void;
}

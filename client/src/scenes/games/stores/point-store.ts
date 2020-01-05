import {InputStore} from '@stores/input-store';
import {InputsStore, FormField} from '@stores/inputs-store';
import {computed, observable, action} from 'mobx';

interface GeoPointStoreProps {
  lat: number;
  lng: number;
}

export class GeoPointStore implements FormField {
  @observable isPending = false;

  lat: InputStore<number>;
  lng: InputStore<number>;

  inputs: InputsStore;

  get isValid(): boolean {
    return this.inputs.isValid;
  }

  async validate(): Promise<void> {
    await this.inputs.validate();
  }

  reset(): void {
    this.inputs.reset();
  }

  validateLng = (value: number): void | never => {
    if (isNaN(value)) throw new Error('Longitude is required field');

    if (value >= 180) throw new Error('Longitude should be less than 180 degrees');

    if (value < -180) throw new Error('Longitude shouldn\'t be less than -180 degrees');
  }

  validateLat = (value: number): void | never => {
    if (isNaN(value)) throw new Error('Latitude is required field');

    if (value >= 180) throw new Error('Latitude shouldn\'t be more than 90 degrees');

    if (value < -180) throw new Error('Latitude shouldn\'t be less than -90 degrees');
  }

  @computed
  get value(): grider.GeoPoint {
    return {
      lat: +this.lat.value,
      lng: +this.lng.value,
    };
  }

  @action
  setPoint({lat, lng}: grider.GeoPoint): void {
    this.lat.setValue(lat);
    this.lng.setValue(lng);
  }

  constructor({
    lat,
    lng,
  }: GeoPointStoreProps) {
    this.lng = new InputStore<number>({
      value: lng,
      validate: this.validateLng,
    });
    this.lat = new InputStore({
      value: lat,
      validate: this.validateLat,
    });

    this.inputs = new InputsStore({
      inputs: [this.lat, this.lng],
    });
  }
}

import {MapService} from '../../../../map';
import { EventableFeatureService } from '../../../services/eventable-feature-service';
import { groundOverlayEventNames } from './event-names';
import { groupGroundOverlayProps } from './group-ground-overlay-props';
import {
  GroundOverlayEventName, 
  GroundOverlayEventHandler,
  GroundOverlayHandlerName,
  GroundOverlayProps,
  GroundOverlaySettings
} from '../';
import isEqual from 'lodash/isEqual';

export class GroundOverlayService extends EventableFeatureService<
  google.maps.GroundOverlay,
  GroundOverlayEventName,
  GroundOverlaySettings,
  GroundOverlayEventHandler,
  GroundOverlayHandlerName
> {
  constructor(
    google: Google,
    mapService: MapService,
    {
      bounds,
      url,
      ...props
    }: GroundOverlayProps
  ) {
    super(
      google, 
      mapService,
      new google.maps.GroundOverlay(
        url, 
        new google.maps.LatLngBounds(
          {lat: bounds.south, lng: bounds.west}, 
          {lat: bounds.north, lng: bounds.east}
        ),
        {map: mapService.getObject(), ...props}
      ),
      groupGroundOverlayProps({
        bounds,
        url,
        ...props
      }),
      groundOverlayEventNames,
      groupGroundOverlayProps,
    );
  }

  setOptions(props: GroundOverlaySettings | undefined) {
    if (!props) return;

    const {
      bounds, 
      url,
      ...options
    } = props;

    const hasNewBounds = 'bounds' in props;
    const hasNewUrl = 'url' in props;

    if (hasNewBounds) {
      this.setBounds(bounds);
    }

    if (hasNewUrl) {
      this.setUrl(url);
    }

    if ('clickable' in options) {
      this.object.set('clickable', options.clickable);
    }

    if (options.map) {
      this.object.setMap(options.map);
    }

    if (options.opacity) {      
      this.object.setOpacity(options.opacity);
    }

    this.options = {
      ...this.options,
      ...options,
    };
  }

  setBounds(bounds: google.maps.LatLngBoundsLiteral) {
    const {north, east, south, west} = bounds;

    const latLngBounds = new this.google.maps.LatLngBounds(      
      {lat: south, lng: west}, 
      {lat: north, lng: east}
    );

    this.object.set('bounds', latLngBounds);

    this.options.bounds = bounds;

    this.object.map_changed();
  }

  getBounds(): google.maps.LatLngBoundsLiteral {
    const bounds = this.object.get('bounds') as google.maps.LatLngBounds;

    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    return {
      north: northEast.lat(),
      east: northEast.lng(),
      south: southWest.lat(),
      west: southWest.lng(),
    };
  }

  setUrl(url: string) {
    this.object.set('url', url);

    this.options.url = url;

    this.object.map_changed();
  }

  getUrl(): string {
    return this.object.getUrl();
  }
}

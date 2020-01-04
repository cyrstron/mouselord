import {MapService} from '../../../../map';
import { infoWindowEventNames } from './event-names';
import { groupInfoWindowProps } from './group-info-window-props';
import {
  InfoWindowEventName, 
  InfoWindowEventHandler,
  InfoWindowHandlerName,
  InfoWindowProps,
  InfoWindowSettings
} from '..';
import { MapsEventableObjectService } from '../../../../../services/maps-eventable-object';
import { MarkerService } from '../../marker';

export class InfoWindowService extends MapsEventableObjectService<
  google.maps.InfoWindow,
  InfoWindowEventName,
  InfoWindowSettings,
  InfoWindowEventHandler,
  InfoWindowHandlerName
> {
  mapService: MapService;
  markerService: MarkerService;

  constructor(
    google: Google,
    mapService: MapService, {
      anchor,
      open,
      ...props
    }: InfoWindowProps
  ) {    
    super(
      google, 
      new google.maps.InfoWindow(props),
      groupInfoWindowProps({
        anchor,
        open,
        ...props
      }), 
      infoWindowEventNames, 
      groupInfoWindowProps
    );

    const container = document.createElement('div');

    container.style.width = '100%';
    container.style.height = '100%';

    this.object.setContent(container);

    if (open) {
      this.object.open(mapService.getObject(), anchor.getObject());
    }

    this.markerService = anchor;
    this.mapService = mapService;
  }

  unmount() {
    this.object.close();

    super.unmount();
  }

  hide() {    
    this.object.close();
  }

  show() {    
    this.object.open(this.mapService.getObject(), this.markerService.getObject());
  }

  setOptions(props: InfoWindowSettings | undefined) {
    if (!props) return;

    const {anchor} = props;

    if ('anchor' in props) {
      this.object.open(this.mapService.getObject(), anchor.getObject());
      this.markerService = anchor;
    }

    if ('open' in props) {
      this.setOpen(props.open);
    }

    super.setOptions(props);
  }

  setOpen(isOpen: boolean) {
    if (isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  getContainer(): Element {
    return this.object.getContent() as Element;
  }
}

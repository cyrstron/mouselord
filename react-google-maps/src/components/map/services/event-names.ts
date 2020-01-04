import {mapsObjectEventNames} from '../../../services/maps-eventable-object';
import { MapEventNames } from '../';

export const mapEventNames: MapEventNames = {
  ...mapsObjectEventNames,
  onMouseMove: 'mousemove',
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onMaptypeIdChanged: 'maptypeid_changed',
  onProjectionChanged: 'projection_changed',
  onTilesLoaded: 'tilesloaded',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed',
}

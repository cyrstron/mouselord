import { createBoundsUtils } from './bounds-utils';
import { createDomOverlayClass } from './dom-overlay';
import { createTilesOverlayClass } from './tiles-overlay';

export const extendGoogleApi = (google: Google) => {
  const DomOverlay = createDomOverlayClass(google);
  const TilesOverlay = createTilesOverlayClass(google);
  const boundsUtils = createBoundsUtils(google);

  google.custom = {
    DomOverlay,
    TilesOverlay,
    ...boundsUtils,
  };
};

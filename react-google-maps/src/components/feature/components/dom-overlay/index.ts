import { ReactNode } from 'react';

import { withSmartFeatureCtx, withDumbFeatureCtx } from '../../hocs';
import {DomOverlayService, createDomOverlayService} from './services';

export type DomOverlayProps = google.custom.DomOverlayOptions & {
  children?: ReactNode;
};

export {DomOverlay} from './dom-overlay';
export {DumbDomOverlay} from './dumb-dom-overlay';

export const withSmartDomOverlayCtx = withSmartFeatureCtx<
  google.custom.DomOverlayOptions,
  DomOverlayService
>(createDomOverlayService);

export const withDumbDomOverlayCtx = withDumbFeatureCtx<
  google.custom.DomOverlayOptions, 
  DomOverlayService
>();

export {useDomOverlayCtx} from './hooks';

export {DomOverlayService};

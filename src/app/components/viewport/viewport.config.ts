import {InjectionToken} from '@angular/core';
import {ViewportConfig} from './viewport.interfaces';

export const VIEWPORT_DEFAULTS_TOKEN = new InjectionToken<ViewportConfig>('viewport-config');

export const viewportDefaultConfig: ViewportConfig = {
  width: 640,
  height: 480,
  unitSize: 15,
  onFrameRender: () => {
  },
  onViewportReady: () => {
  },
};

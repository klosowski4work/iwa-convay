import {Point} from '../../utils/point';

export interface ViewportApi {
  clearViewport: () => void;
  fillCell: (pos: Point) => void;
  changeDimensions: (width: number, height: number) => void;
}

export interface ViewportConfig {
  width?: number;
  height?: number;
  unitSize?: number;
  onViewportReady?: (viewportApi: ViewportApi) => void;
  onFrameRender?: (api: ViewportApi) => void;
}

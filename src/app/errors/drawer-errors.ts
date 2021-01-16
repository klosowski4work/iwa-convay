export class DrawerCtxError extends Error {
  constructor() {
    super(`Drawer canvas context wasn't setted`);
    this.name = 'DrawerCtxError';
  }
}

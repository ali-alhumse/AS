export class EventManager {
  constructor() {
    this.cleanups = [];
  }

  listen(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    this.cleanups.push(() => target.removeEventListener(type, handler, options));
    return handler;
  }

  addCleanup(cleanup) {
    this.cleanups.push(cleanup);
    return cleanup;
  }

  clear() {
    for (const cleanup of this.cleanups.splice(0)) cleanup();
  }
}

export class AnimationManager {
  constructor() {
    this.frames = new Set();
  }

  request(callback) {
    const id = requestAnimationFrame(callback);
    this.frames.add(id);
    return id;
  }

  cancel(id) {
    if (id == null) return;
    cancelAnimationFrame(id);
    this.frames.delete(id);
  }

  clear() {
    for (const id of this.frames) cancelAnimationFrame(id);
    this.frames.clear();
  }
}

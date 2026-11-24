export class SceneManager {
  constructor({ app, scenes }) {
    this.app = app;
    this.scenes = scenes;
    this.currentIndex = -1;
    this.currentCleanup = null;
  }

  async start(index = 0) {
    await this.goTo(index);
  }

  async goTo(index) {
    this.stopCurrent();
    this.currentIndex = index;
    const scene = this.scenes[index];
    if (!scene) return false;
    this.currentCleanup = await scene({ app: this.app, manager: this });
    return true;
  }

  next() {
    return this.goTo(this.currentIndex + 1);
  }

  stopCurrent() {
    if (typeof this.currentCleanup === 'function') this.currentCleanup();
    this.currentCleanup = null;
  }
}

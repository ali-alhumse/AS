import { STORAGE_KEY } from '../data/constants.js';
import { SceneManager } from '../core/scene-manager.js';
import { renderStartScene } from '../scenes/start-scene.js';
import { renderBalloonScene } from '../scenes/balloon-scene.js';
import { renderHeartScene } from '../scenes/heart-scene.js';
import { renderCardsScene } from '../scenes/cards-scene.js';
import { renderCakeScene } from '../scenes/cake-scene.js';
import { renderGalleryScene } from '../scenes/gallery-scene.js';
import { renderExitScene } from '../scenes/exit-scene.js';
import { installRoundRectPolyfill } from '../utils/canvas.js';

const app = document.getElementById('app');
installRoundRectPolyfill();
window.addEventListener('birthday:finish', endProject);

const sceneRenderers = [
  renderBalloonScene,
  renderHeartScene,
  renderCardsScene,
  renderCakeScene,
  renderGalleryScene,
];

const sceneManager = new SceneManager({
  app,
  scenes: sceneRenderers.map((renderer) => (context) => renderer({
    ...context,
    nextSlide: () => sceneManager.next(),
    endProject,
  })),
});

function startProject() {
  renderStartScene({ app, onReady: () => sceneManager.start(0) });
}

function endProject() {
  localStorage.setItem(STORAGE_KEY, 'true');
  sceneManager.stopCurrent();
  renderExitScene({ app, onReplay: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }});
}

if (localStorage.getItem(STORAGE_KEY)) {
  endProject();
} else {
  startProject();
}

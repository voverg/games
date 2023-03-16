import { BootScene } from './scenes/boot-scene.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { StartScene } from './scenes/start-scene.js';
import { GameScene } from './scenes/game-scene.js';

// Game config
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
};

// Greate a game
const game = new Phaser.Game(config);

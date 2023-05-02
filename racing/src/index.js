import Phaser from 'phaser';

import { BootScene } from './scenes/boot-scene.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { StartScene } from './scenes/start-scene.js';
import { GameScene } from './scenes/game-scene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: {x: 0, y: 0}
    },
  },
};

const game = new Phaser.Game(config);
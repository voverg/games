import { GameScene } from './game-scene.js';

// Create scene 
const sceneProps = {
  rows: 2,
  cols: 5,
  cards: [1, 2, 3, 4, 5],
  timeout: 30,
};

// Game config
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: new GameScene('Game', sceneProps),
};

// Greate a game
const game = new Phaser.Game(config);

import { GameScene } from './game-scene.js';
import { Levels } from './levels.js';


const levelModel = new Levels();
const sceneProps = {levelModel};

// Game config
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: new GameScene('Game', sceneProps),
};

// Greate a game
const game = new Phaser.Game(config);

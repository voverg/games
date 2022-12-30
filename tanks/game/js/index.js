import { Game } from './game.js';

const game = new Game();

game.load().then(() => {
  game.start();
});

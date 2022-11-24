import {Sprites} from './models/sprites.model.js';
import {Cells} from './models/cells.model.js';
import {SnakeModel} from './models/snake.model.js';

import {Canvas} from './components/canvas.js';
import {Board} from './components/board.js';
import {Snake} from './components/snake.js';

export class Game {
  constructor() {
    this.canvas = null;
    this.board = null;
    this.snake = null;

    this.spritesModel = null;
    this.cellsModel = null
    this.snakeModel = null;

    this.boardSize = 15;
  }

  _init() {
    this.spritesModel = new Sprites();
    this.cellsModel = new Cells();
    this.snakeModel = new SnakeModel();

    this.canvas = new Canvas();
    this.board = new Board();
    this.snake = new Snake();
  }

  _preload(callback) {
    this.spritesModel.forEach((sprite, index) => {
      sprite.elem.addEventListener('load', () => {
        if (index >= this.spritesModel.length - 1) {
          callback();
        }
      });
    });
  }

  start() {
    this._init();
    this._preload(() => {
      this.run();
    });
  }

  _create() {
    // Create game objects
    this.cellsModel.init(this.canvas, this.spritesModel);
    this.snakeModel.init(this.cellsModel);
    this.board.init(this.canvas, this.cellsModel, this.spritesModel);
    this.snake.init(this.canvas, this.snakeModel, this.spritesModel);
    // Geme events
    window.addEventListener('keydown', (event) => {
      this.snakeModel.start(event.code);
    });
  }

  _render() {
    window.requestAnimationFrame(() => {
      this.canvas.clearAll();
      // this.canvas.drawImage(this.sprites.getElem('background'), 0, 0);
      this.board.render();
      this.snake.render();
    });
  }

  _update() {
    this.snakeModel.move();
    this._render();
  }

  run() {
    this._create();

    setInterval(() => {
      this._update();
    }, 150);
  }

}
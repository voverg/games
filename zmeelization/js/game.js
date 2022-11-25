import {Sprites} from './models/sprites.model.js';
import {Cells} from './models/cells.model.js';
import {SnakeModel} from './models/snake.model.js';
import {FoodModel} from './models/food.model.js';

import {BoardController} from './controllers/board.controller.js';

import {Canvas} from './components/canvas.js';
import {Board} from './components/board.js';
import {Snake} from './components/snake.js';

export class Game {
  constructor() {
    this.components = {
      canvas: new Canvas(),
      board: new Board(),
      snake: new Snake(),
    }
    this.models = {
      sprites: new Sprites(),
      cells: new Cells(),
      snake: new SnakeModel(),
      food: new FoodModel(),
    }
    this.controllers = {
      board: new BoardController(),
    }
  }

  _preload(callback) {
    this.models.sprites.forEach((sprite, index) => {
      sprite.elem.addEventListener('load', () => {
        if (index >= this.models.sprites.length - 1) {
          callback();
        }
      });
    });
  }

  start() {
    this._preload(() => {
      this.run();
    });
  }

  _create() {
    // Creat game controllers
    this.controllers.board.init(this.components, this.models);
    // Geme events
    window.addEventListener('keydown', (event) => {
      this.controllers.board.start(event.code);
    });
  }

  _render() {
    window.requestAnimationFrame(() => {
      this.components.canvas.clearAll();
      // this.canvas.drawImage(this.sprites.getElem('background'), 0, 0);
      this.components.board.render();
      this.components.snake.render();
    });
  }

  _update() {
    this.controllers.board.move();
    this._render();
  }

  run() {
    this._create();

    setInterval(() => {
      this._update();
    }, 150);
  }

}
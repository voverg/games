import {Sprites} from './models/sprites.model.js';
import {Cells} from './models/cells.model.js';
import {SnakeModel} from './models/snake.model.js';

import {BoardController} from './controllers/board.controller.js';
import {Event} from './controllers/event.controller.js';

import {Canvas} from './components/canvas.js';
import {Board} from './components/board.js';
import {Snake} from './components/snake.js';

export class Game {
  constructor() {
    this.components = {
      canvas: new Canvas(),
      board: new Board(),
      snake: new Snake(),
    };
    this.models = {
      sprites: new Sprites(),
      cells: new Cells(),
      snake: new SnakeModel(),
    };
    this.controllers = {
      board: new BoardController(),
      event: new Event(),
    };
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

  load() {
    this._preload(() => {
      this._init();
      this.start();
      this.run();
    });
  }

  start() {
    this.models.cells.setDefault();
    this.models.snake.setDefault();

    this.controllers.board.createCells();
    this.controllers.board.createSnake();
    this.controllers.board.createFood();
    this.controllers.board.createBomb();
  }

  _init() {
    // Init components
    Object.keys(this.components).forEach((key) => {
      this.components[key].init(this.components, this.models);
    });
    // Init controllers
    Object.keys(this.controllers).forEach((key) => {
      this.controllers[key].init(this.components, this.models);
    });
  }

  _render() {
    window.requestAnimationFrame(() => {
      this.components.canvas.clearAll();
      // Render components
      Object.keys(this.components).forEach((key) => {
        this.components[key].render();
      });
    });
  }

  _update() {
    this.move();
    this._render();
  }

  run() {
    // Game update interval
    this.gameInterval = setInterval(() => {
      this._update();
    }, 150);
    // Bomb update interval
    this.bombInterval = setInterval(() => {
      if (this.models.snake.moving) {
        this.controllers.board.createBomb();
      }
    }, 3000);
  }

  move() {
    if (!this.models.snake.moving) {
      return;
    }

    const snakeHead = this.models.snake.getByIndex(0);
    const nextCell = this.models.cells.getNext(snakeHead, this.models.snake.direction);

    if (!nextCell || this.models.snake.hasCell(nextCell) || nextCell.type === 'bomb') {
      this.stop();
    } else {
      this.models.snake.unshift(nextCell);
      if (nextCell.type !== 'food') {
        this.models.snake.pop();
      } else {
        this.controllers.board.createFood();
        this.models.snake.score += 1;
      }
    }
  }

  stop() {
    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    alert(`The game is over. Your score is ${this.models.snake.score}`);
    window.location.reload();
  }

}
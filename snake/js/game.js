import {Sprites} from './models/sprites.model.js';
import {Sounds} from './models/sounds.model.js';
import {Cells} from './models/cells.model.js';
import {SnakeModel} from './models/snake.model.js';

import {BoardController} from './controllers/board.controller.js';
import {Event} from './controllers/event.controller.js';

import {Canvas} from './components/canvas.js';
import {Board} from './components/board.js';
import {Snake} from './components/snake.js';
import {Header} from './components/header.js';
import {Controls} from './components/controls.js';

import { Store } from './core/store.js';
import { Actions } from './utils/actions.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.actions = new Actions(this.store);

    this.staticComponents = {
      header: new Header(),
      controls: new Controls(),
    }

    this.components = {
      canvas: new Canvas(),
      board: new Board(),
      snake: new Snake(),
    };
    this.models = {
      sprites: new Sprites(),
      sounds: new Sounds(),
      cells: new Cells(),
      snake: new SnakeModel(),
    };
    this.controllers = {
      board: new BoardController(),
      event: new Event(),
    };
  }

  _preload(callback) {
    const sourceLen = this.models.sprites.length + this.models.sounds.length;
    let index = 0;

    const onAssetLoad = () => {
      index++;
      if (index >= sourceLen) {
        callback();
      }
    };
    // Preload sprites
    this.models.sprites.forEach((sprite) => {
      sprite.elem.addEventListener('load', onAssetLoad);
    });
    // Preload sounds
    this.models.sounds.forEach((sound) => {
      sound.elem.addEventListener('canplaythrough', onAssetLoad, {once: true});
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
    // this.models.cells.setDefault();
    // this.models.snake.setDefault();

    this.controllers.board.createCells();
    this.controllers.board.createSnake();
    this.controllers.board.createFood();
    this.controllers.board.createBomb();
  }

  _init() {
    // Init and render static components
    Object.keys(this.staticComponents).forEach((key) => {
      this.staticComponents[key].init(this.components, this.models, this.store);
      this.staticComponents[key].render();
    });
    // Init dynamic components
    Object.keys(this.components).forEach((key) => {
      this.components[key].init(this.components, this.models, this.store);
    });
    // Init controllers
    Object.keys(this.controllers).forEach((key) => {
      this.controllers[key].init(this.components, this.models, this.store, this.actions);
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

    // if (this.models.sounds.isSound) {
    //   this.models.sounds.loop('theme');
    // }

    const snakeHead = this.models.snake.getByIndex(0);
    const nextCell = this.models.cells.getNext(snakeHead, this.models.snake.direction);

    if (!nextCell || this.models.snake.hasCell(nextCell) || nextCell.type === 'bomb') {
      // this.stop();
    } else {
      this.models.snake.unshift(nextCell);

      if (nextCell.type !== 'food') {
        this.models.snake.pop();
      } else {
        this.models.sounds.play('food');
        this.controllers.board.createFood();
        this.models.snake.score += 1;
        this.actions.setScore(this.models.snake.score);
      }
    }
  }

  stop() {
    this.models.sounds.play('gameOver');
    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    alert(`The game is over. Your score is ${this.models.snake.score}`);
    window.location.reload();
  }

}
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

  start() {
    this._preload(() => {
      this.run();
    });
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
    this.controllers.board.move();
    this._render();
  }

  run() {
    this._init();

    setInterval(() => {
      this._update();
    }, 150);
  }

}
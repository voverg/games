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
import {Modal} from './components/modal.js';

import { Store } from './store/store.js';
import { Actions } from './store/actions.js';
import { Service } from './utils/service.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.actions = new Actions(this.store);

    this.staticComponents = {
      header: new Header(),
      controls: new Controls(),
      modal: new Modal(),
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
      this.run();
    });
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

    this._setHighscoreToStore();
    this._setLevelToStore();
    this._onSoundTheme();
  }

  _setHighscoreToStore() {
    let highScore = Service.get('snake-highscore');
    highScore = highScore ? highScore : 0;
    this.actions.setHiscore(highScore);
  }

  _setLevelToStore() {
    let level = Service.get('snake-level');
    level = level ? level : 1;
    this.actions.setLevel(level);
  }

  _onSoundTheme() {
    const $sound = document.querySelector('.play__sound');
    $sound.click();
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
    if (this.store.getState().level >= 2) {
      this.bombInterval = setInterval(() => {
        const state = this.store.getState();

        if (this.models.snake.moving) {
            this.controllers.board.createBomb(state.level -1);
        }
      }, 3000);
    }
  }

  move() {
    if (!this.models.snake.moving) {
      return;
    }

    const state = this.store.getState();
    const snakeHead = this.models.snake.getByIndex(0);
    const nextCell = this.models.cells.getNext(snakeHead, this.models.snake.direction);
    const condition = !nextCell || this.models.snake.hasCell(nextCell) || nextCell.type === 'bomb';

    if (condition) {
      this.stop();
    } else if (state.score >= 20) {
      Service.set('snake-level', state.level + 1);
      this.actions.setWin(true);
      this.stop();
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
    // Show game over modal
    this.actions.setModal(true);
    this.actions.setModalContent('finish');
    // Set highScore to localStorage
    const state = this.store.getState();
    let highScore = state.score > state.highScore ? state.score : state.highScore;
    highScore = state.win ? 0 : highScore;
    Service.set('snake-highscore', highScore);
  }

}
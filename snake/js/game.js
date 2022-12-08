import {Sprites} from './models/sprites.model.js';
import {Sounds} from './models/sounds.model.js';
import {Cells} from './models/cells.model.js';
import {SnakeModel} from './models/snake.model.js';

import {BoardController} from './controllers/board.controller.js';
import {Event} from './controllers/event.controller.js';
import { Service } from './controllers/service.controller.js';

import {Canvas} from './components/canvas.js';
import {Board} from './components/board.js';
import {Snake} from './components/snake.js';
import {Header} from './components/header.js';
import {Controls} from './components/controls.js';
import {Modal} from './components/modal.js';

import { Store } from './store/store.js';
import { Actions } from './store/actions.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.state = null;
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
      service: new Service(),
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

    this.controllers.service.setHighscoreToStore();
    this.controllers.service.setLevelToStore();

    this.state = this.store.getState();
    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    this._setSnakeSpeedToStore();
    this._setBombSpeedToStore();
    this.controllers.board.createBomb(this.state.level - 1);
  }

  _setSnakeSpeedToStore() {
    const snakeSpeed = Math.floor(600 - this.state.level * 50);
    this.actions.setSnakeSpeed(snakeSpeed);
  }

  _setBombSpeedToStore() {
    const bombSpeed = Math.floor(10000 - this.state.level * 500);
    this.actions.setBombSpeed(bombSpeed);
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
    }, this.state.snakeSpeed);
    // Bomb update interval
    if (this.state.level >= 2) {
      this.bombInterval = setInterval(() => {
        if (this.state.moving) {
            this.controllers.board.createBomb(this.state.level - 1);
        }
      }, this.state.bombSpeed);
    }
  }

  move() {
    if (!this.state.moving) {
      return;
    }

    if (!this.state.sound) {
      this._onSoundTheme();
    }

    let snakeHead = this.models.snake.getByIndex(0);
    let nextCell = this.models.cells.getNext(snakeHead, this.models.snake.direction);

    if (!nextCell && this.state.level < 4) {
      const directionObj = {up: 'row', down: 'row', left: 'col', right: 'col'};
      const directionValues = {up: 1, down: -1, left: 1, right: -1};
      const direction = directionObj[this.models.snake.direction];
      const directionVal = directionValues[this.models.snake.direction];
      snakeHead[direction] += directionVal * this.models.cells.size;
      nextCell = this.models.cells.getNext(snakeHead, this.models.snake.direction);
    }

    const condition = !nextCell || this.models.snake.hasCell(nextCell) || nextCell.type === 'bomb';

    if (condition) {
      this.stop();
    } else if (this.state.score >= 20) {
      this.controllers.service.set('snake-level', this.state.level + 1);
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
    this.playFinishSound();

    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    // Show game over modal
    this.actions.setModal(true);
    this.actions.setModalContent('finish');
    // Set highScore to localStorage
    let highScore = this.state.score > this.state.highScore ? this.state.score : this.state.highScore;
    highScore = this.state.win ? 0 : highScore;
    this.controllers.service.set('snake-highscore', highScore);
  }

  playFinishSound() {
    this._onSoundTheme();
    const sound = this.state.win ? 'levelUp' : 'gameOver';
    this.models.sounds.play(sound);
  }

}
import { Sprite } from './sources/sprite.js';

import { Levels } from './models/levels.model.js';
import { Grid } from './models/grid.model.js';

import { Board } from './components/board.component.js';
import { Tank } from './components/tank.component.js';

import { Event } from './controllers/event.controller.js';
import { BoardController } from './controllers/board.controller.js';
import { TankController } from './controllers/tank.controller.js';

import { Store } from './store/store.js';
import { Actions } from './store/actions.js';
import { Canvas } from './canvas.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.state = this.store.getState();
    this.actions = new Actions(this.store);
    this.canvas = new Canvas();

    this.sources = {
      sprite: new Sprite(),
    };

    this.models = {
      levels: new Levels(),
      grid: new Grid(),
    };

    this.controllers = {
      event: new Event(),
      board: new BoardController(),
      tank: new TankController(),
    };

    this.components = {
      board: new Board(),
      tank: new Tank(),
    };

    this.loop = this.loop.bind(this);
  }

  async load() {
    // Load sources
    Object.keys(this.sources).forEach((key) => {
      this.sources[key].load();
    });
  }

  init() {
    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
    // Init canvas
    this.canvas.init({
        store: this.store,
        actions: this.actions,
        sources: this.sources,
        models: this.models,
      });
    // Inin canvas components
    Object.keys(this.components).forEach((key) => {
      this.components[key].init(this.canvas, this.models);
    });
    // Init controllers
    Object.keys(this.controllers).forEach((key) => {
      this.controllers[key].init({
        sources: this.sources,
        store: this.store,
        actions: this.actions,
        canvas: this.canvas,
        models: this.models,
        components: this.components,
      });
    });
  }

  start() {
    this.init();
    requestAnimationFrame(this.loop);
  }

  move() {
    this.controllers.tank.move();
  }

  render() {
    this.canvas.clearAll();
    // Render canvas components
    Object.keys(this.components).forEach((key) => {
      this.components[key].render();
    });
  }

  loop() {
    this.move();
    this.render();

    requestAnimationFrame(this.loop);
  }
}
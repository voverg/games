import { Sprite } from './sources/sprite.js';

import { Levels } from './models/levels.model.js';
import { Grid } from './models/grid.model.js';

import { Board } from './components/board.component.js';
import { Cell } from './components/cell.component.js';
import { Tank } from './components/tank.component.js';

import { Canvas } from './controllers/canvas.controller.js';
import { Event } from './controllers/event.controller.js';
import { BoardController } from './controllers/board.controller.js';
import { TankController } from './controllers/tank.controller.js';

import { Store } from './store/store.js';
import { Actions } from './store/actions.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.state = this.store.getState();
    this.actions = new Actions(this.store);

    this.sources = {
      sprite: new Sprite(),
    };

    this.models = {
      levels: new Levels(),
      grid: new Grid(),
    };

    this.controllers = {
      canvas: new Canvas(),
      event: new Event(),
      board: new BoardController(),
      tank: new TankController(),
    };

    this.components = {
      board: new Board(),
      cell: new Cell(this.controllers.canvas),
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
    // Init controllers
    Object.keys(this.controllers).forEach((key) => {
      this.controllers[key].init({
        store: this.store,
        actions: this.actions,
        sources: this.sources,
        models: this.models,
        components: this.components,
      });
    });
    // Inin canvas components
    Object.keys(this.components).forEach((key) => {
      this.components[key].init(this.controllers, this.models);
    });
  }

  start() {
    this.init();
    requestAnimationFrame(this.loop);
  }

  move() {
    const canvasBorders = {
      width: this.controllers.canvas.width - this.sources.sprite.tankWidth,
      height: this.controllers.canvas.height - this.sources.sprite.tankHeight,
    };

    this.controllers.tank.move(canvasBorders);
  }

  render() {
    this.controllers.canvas.clearAll();
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
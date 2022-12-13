import { Sprite } from './sources/sprite.js';

import { Cell } from './entities/cell.js';
import { Bullet } from './entities/bullet.js';

import { Levels } from './models/levels.model.js';
import { Grid } from './models/grid.model.js';
import { BulletModel } from './models/bullet.model.js';

import { Board } from './components/board.component.js';
import { Tank } from './components/tank.component.js';
import { BulletComponent } from './components/bullet.component.js';

import { Event } from './controllers/event.controller.js';
import { BoardController } from './controllers/board.controller.js';
import { TankController } from './controllers/tank.controller.js';
import { BulletController } from './controllers/bullet.controller.js';

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

    this.entities = {Cell, Bullet};

    this.models = {
      levels: new Levels(),
      grid: new Grid(),
      bullet: new BulletModel(),
    };

    this.controllers = {
      event: new Event(),
      board: new BoardController(),
      tank: new TankController(),
      bullet: new BulletController(),
    };

    this.components = {
      board: new Board(),
      tank: new Tank(),
      bullet: new BulletComponent(),
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
        entities: this.entities,
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

  update() {
    this.controllers.tank.move();
    this.controllers.bullet.move();
  }

  render() {
    this.canvas.clearAll();
    // Render canvas components
    Object.keys(this.components).forEach((key) => {
      this.components[key].render();
    });
  }

  loop() {
    this.update();
    this.render();

    requestAnimationFrame(this.loop);
  }
}
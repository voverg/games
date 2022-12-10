import { Levels } from './models/levels.model.js';

import { Tank } from './components/tank.component.js';

import { Board } from './board.js';
import { Event } from './controllers/event.controller.js';
import { TankController } from './controllers/tank.controller.js';


import { Canvas } from './canvas.js';
import { Store } from './store/store.js';
import { Actions } from './store/actions.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.state = this.store.getState();
    this.actions = new Actions(this.store);
    this.canvas = new Canvas(this.store);

    this.components = {
      tank: new Tank(this.canvas),
    }

    this.controllers = {
      event: new Event(),
      tank: new TankController(),
    }

    this.loop = this.loop.bind(this);
  }

  async load() {
    this.canvas.load();
  }

  init() {
    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    Object.keys(this.controllers).forEach((key) => {
      this.controllers[key].init(this.store, this.actions);
    });
  }

  start() {
    this.init();
    requestAnimationFrame(this.loop);
  }

  move() {
    this.controllers.tank.move(this.canvas);
  }

  render() {
    this.canvas.clearAll();

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
// Sources
import { Sprite } from './sources/sprite.js';
// Entities
import { Cell } from './entities/cell.js';
import { Bullet } from './entities/bullet.js';
import { Tank } from './entities/tank.js';
// Models
import { LevelsModel } from './models/levels.model.js';
import { GridModel } from './models/grid.model.js';
import { BulletModel } from './models/bullet.model.js';
import { TankModel } from './models/tank.model.js';
// Components
import { BoardComponent } from './components/board.component.js';
import { PlayerComponent } from './components/player.component.js';
import { EnemyComponent } from './components/enemy.component.js';
import { BulletComponent } from './components/bullet.component.js';
// Controllers
import { EventController } from './controllers/event.controller.js';
import { BoardController } from './controllers/board.controller.js';
import { PlayerTankController } from './controllers/player-tank.controller.js';
import { EnemyTankController } from './controllers/enemy-tank.controller.js';
import { PlayerBulletController } from './controllers/player-bullet.controller.js';
import { EnemyBulletController } from './controllers/enemy-bullet.controller.js';

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

    this.entities = {Cell, Tank, Bullet};

    this.models = {
      levels: new LevelsModel(),
      grid: new GridModel(),
      player: new TankModel(),
      enemy: new TankModel(),
      bullet: new BulletModel(),
    };

    this.controllers = {
      event: new EventController(),
      board: new BoardController(),
      playerTank: new PlayerTankController(),
      playerBullet: new PlayerBulletController(),
      enemyTank: new EnemyTankController(),
      enemyBullet: new EnemyBulletController(),
    };

    this.components = {
      board: new BoardComponent(),
      player: new PlayerComponent(),
      enemy: new EnemyComponent(),
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
    this.controllers.board.update();
    this.controllers.playerTank.move();
    this.controllers.playerTank.shoot();
    this.controllers.playerBullet.move();
    this.controllers.enemyTank.move();
    this.controllers.enemyTank.shoot();
    this.controllers.enemyBullet.move();
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
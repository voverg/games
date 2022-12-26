// Sources
import { Sprite } from './sources/sprite.js';
import { Sound } from './sources/sound.js';
// Entities
import { Cell } from './entities/cell.js';
import { Tank } from './entities/tank.js';
import { Bullet } from './entities/bullet.js';
import { Explosion } from './entities/explosion.js';
import { Bonus } from './entities/bonus.js';
// Models
import { LevelsModel } from './models/levels.model.js';
import { BaseModel } from './models/base.model.js';
import { GridModel } from './models/grid.model.js';
import { TankModel } from './models/tank.model.js';
import { BulletModel } from './models/bullet.model.js';
import { ExplosionModel } from './models/explosion.model.js';
import { BonusModel } from './models/bonus.model.js';
// Components
import { BoardComponent } from './components/board.component.js';
import { PlayerComponent } from './components/player.component.js';
import { EnemyComponent } from './components/enemy.component.js';
import { BulletComponent } from './components/bullet.component.js';
import { ExplosionComponent } from './components/explosion.component.js';
import { BonusComponent } from './components/bonus.component.js';
// Static components
import { Aside } from './components/static/aside.static.js';
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
import { Service } from './utils/service.js';

export class Game {
  constructor() {
    this.store = new Store();
    this.state = this.store.getState();
    this.actions = new Actions(this.store);
    this.canvas = new Canvas();
    this.service = new Service({store: this.store, actions: this.actions});

    this.sources = {
      sprite: new Sprite(),
      sound: new Sound(),
    };

    this.entities = {Cell, Tank, Bullet, Explosion, Bonus};

    this.models = {
      levels: new LevelsModel(),
      base: new BaseModel(),
      grid: new GridModel(),
      player: new TankModel(),
      enemy: new TankModel(),
      bullet: new BulletModel(),
      explosion: new ExplosionModel(),
      bonus: new BonusModel(),
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
      explosion: new ExplosionComponent(),
      bonus: new BonusComponent(),
    };

    this.static = {
      aside: new Aside(),
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
      // console.log('game over: ', this.state.isGameOver);
      // console.log('Is Win: ', this.state.isWin);
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
    // Inin static components
    Object.keys(this.static).forEach((key) => {
      this.static[key].init({store: this.store, models: this.models});
      this.static[key].render();
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

    this.service.setLevelToStore();
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

    // if (this.state.isGameOver) {
    //   this.gameOver();
    // } else {
    //   requestAnimationFrame(this.loop);
    // }

    requestAnimationFrame(this.loop);
  }

  gameOver() {
    this.actions.setModal(true);
  }

}
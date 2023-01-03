// Sources
import { Sprite } from './sources/sprite.js';
import { Sound } from './sources/sound.js';
// Entities
import { Cell } from './entities/cell.js';
import { Tank } from './entities/tank.js';
import { Bullet } from './entities/bullet.js';
import { Explosion } from './entities/explosion.js';
import { Score } from './entities/score.js';
import { Bonus } from './entities/bonus.js';
// Models
import { LevelsModel } from './models/levels/levels.model.js';
import { BaseModel } from './models/base.model.js';
import { GridModel } from './models/grid.model.js';
import { TankModel } from './models/tank.model.js';
import { BulletModel } from './models/bullet.model.js';
import { ExplosionModel } from './models/explosion.model.js';
import { ScoreModel } from './models/score.model.js';
import { BonusModel } from './models/bonus.model.js';
// Components
import { BoardComponent } from './components/board.component.js';
import { PlantComponent } from './components/plant.component.js';
import { PlayerComponent } from './components/player.component.js';
import { EnemyComponent } from './components/enemy.component.js';
import { BulletComponent } from './components/bullet.component.js';
import { ExplosionComponent } from './components/explosion.component.js';
import { ScoreComponent } from './components/score.component.js';
import { BonusComponent } from './components/bonus.component.js';
// Static components
import { Aside } from './components/static/aside.static.js';
import { Modal } from './components/static/modal.static.js';
import { Level } from './components/static/level.static.js';
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

    this.entities = {Cell, Tank, Bullet, Explosion, Score, Bonus};

    this.models = {
      levels: new LevelsModel(),
      base: new BaseModel(),
      grid: new GridModel(),
      player: new TankModel(),
      enemy: new TankModel(),
      bullet: new BulletModel(),
      explosion: new ExplosionModel(),
      score: new ScoreModel(),
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
      plant: new PlantComponent(),
      explosion: new ExplosionComponent(),
      score: new ScoreComponent(),
      bonus: new BonusComponent(),
    };

    this.static = {
      aside: new Aside(),
      modal: new Modal(),
      level: new Level(),
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

    this.service.setLevelToStore();
    this.service.setScoreToStore();
    // Init canvas
    this.canvas.init({
        store: this.store,
        actions: this.actions,
        sources: this.sources,
        models: this.models,
      });
    // Inin static components
    Object.keys(this.static).forEach((key) => {
      this.static[key].init({store: this.store, models: this.models, sources: this.sources});
      // this.static[key].render();
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

    if (this.state.isGameOver) {
      this.gameOver();
    } else {
      requestAnimationFrame(this.loop);
    }
  }

  gameOver() {
    this.actions.setModal(true);
    this.setLevelToLocalStorage();
    this.setScoreToLocalStorage();
    this.stopBackgroundSound();
  }

  setLevelToLocalStorage() {
    let nextLevel = this.state.level + 1;
    nextLevel = nextLevel > this.models.levels.getMapsAmount() ? 1 : nextLevel;
    const level = this.state.isWin ? nextLevel : this.state.level;
    this.service.set('tanks-level', level);
  }

  setScoreToLocalStorage() {
    const currentScore = this.service.get('tanks-score') ? this.service.get('tanks-score') : 0;
    const score = this.state.isWin ? this.state.score : currentScore;
    this.service.set('tanks-score', score);
  }

  stopBackgroundSound() {
    this.sources.sound.pause('move');
    this.sources.sound.pause('motor');
  }

}
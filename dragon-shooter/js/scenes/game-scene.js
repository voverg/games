import { Player } from '../prefabs/player.js';
import { Enemy } from '../prefabs/enemy.js';
import { EnemyGroup } from '../prefabs/enemy-group.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');

    this.player = null;
  }

  init() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.createPlayer();
    this.createEnemies();
  }

  update() {
    this.bg.tilePositionX += 0.5;
    this.player.move();
  }

  createPlayer() {
    const pos = {x: 150, y: this.height / 2};
    this.player = new Player(this);
    this.player.init(pos);
  }

  createEnemies() {
    const props = {width: this.width, height: this.height};
    this.enemyGroup = new EnemyGroup(this);
    this.enemyGroup.createEnemy(this, props);
  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0, 0);
  }

}
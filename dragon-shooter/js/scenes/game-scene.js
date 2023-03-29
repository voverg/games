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
    this.createCompleteEvents();
    this.createOverlap();
  }

  update() {
    this.bg.tilePositionX += 0.5;
    this.player.move();
  }

  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this);
    this.events.once('enemies-killed', this.onComplete, this);
  }

  onComplete() {
    this.scene.start('Start');
  }

  createOverlap() {
    this.physics.add.overlap(this.player.fireGroup, this.enemyGroup, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemyGroup.fireGroup, this.player, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemyGroup, this.player, this.onOverlap, undefined, this);
  }

  onOverlap(source, target) {
    source.setAlive(false);
    target.setAlive(false);
  }

  createPlayer() {
    this.player = new Player(this);
  }

  createEnemies() {
    this.enemyGroup = new EnemyGroup(this);
  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0, 0);
  }

}
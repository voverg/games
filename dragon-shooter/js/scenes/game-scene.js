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
    this.score = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.createText();
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
    this.scene.start('Start', {
      score: this.score,
      completed: this.player.active,
    });
  }

  createOverlap() {
    this.physics.add.overlap(this.player.fireGroup, this.enemyGroup, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemyGroup.fireGroup, this.player, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemyGroup, this.player, this.onOverlap, undefined, this);
  }

  onOverlap(source, target) {
    if (source !== this.player && target !== this.player) {
      ++this.score;
      this.scoreText.setText(`Очки ${this.score}`);
    }

    source.setAlive(false);
    target.setAlive(false);
  }

  createPlayer() {
    this.player = new Player(this);
  }

  createEnemies() {
    this.enemyGroup = new EnemyGroup(this);
  }

  createText() {
    const textConfig = {
      font: '48px Caveat',
      fill: '#fff',
    };

    this.scoreText = this.add.text(10, 10, `Очки ${this.score}`, textConfig).setOrigin(0);
  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0, 0);
  }

}
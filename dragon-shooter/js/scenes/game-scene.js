import { Player } from '../prefabs/player.js';
import { Enemy } from '../prefabs/enemy.js';
import { EnemyGroup } from '../prefabs/enemy-group.js';
import { Boom } from '../prefabs/boom.js';

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
    if (!this.sounds) {
      this.createSounds();
    }
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
    const enemy = [source, target].find((item) => item.texture.key === 'enemy');

    if (enemy) {
      this.sounds.boom.play();
      this.makeBoom(target);

      ++this.score;
      this.scoreText.setText(`Очки ${this.score}`);
    }

    source.setAlive(false);
    target.setAlive(false);
  }

  makeBoom(target) {
    const props = {
      scene: this,
      x: target.x,
      y: target.y,
    };

    const boom = new Boom(props);
  }

  createPlayer() {
    this.player = new Player(this);
  }

  createEnemies() {
    this.enemyGroup = new EnemyGroup(this);
  }

  createSounds() {
    this.sounds = {
      theme: this.sound.add('theme', {volume: 0.5, loop: true}),
      boom: this.sound.add('boom', {volume: 0.1}),
    };

    this.sounds.theme.play();
  }

  createText() {
    const textConfig = {
      font: '48px Caveat',
      fill: '#fff',
    };

    this.scoreText = this.add.text(50, 20, `Очки ${this.score}`, textConfig).setOrigin(0);
  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg').setOrigin(0, 0);
  }

}
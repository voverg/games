import { Player } from '../prefabs/player.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');

    this.player = null;
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.createPlayer();
  }

  update() {
    this.player.move();
  }

  createPlayer() {
    const pos = {x: 150, y: this.sys.game.config.height / 2};
    this.player = new Player(this);
    this.player.init(pos);
  }

  onPlayerMove(event) {
    const directonKeys = {
      ArrowUp: () => {this.player.y -= this.player.step},
      ArrowRight: () => {this.player.x += this.player.step},
      ArrowDown: () => {this.player.y += this.player.step},
      ArrowLeft: () => {this.player.x -= this.player.step},
    };

    if (event.key in directonKeys) {
      directonKeys[event.key]();
    }
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

}
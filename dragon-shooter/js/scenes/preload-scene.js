export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.atlas('dragon', 'sprites/dragon.png', 'sprites/dragon.json');
    this.load.atlas('enemy', 'sprites/enemy.png', 'sprites/enemy.json');
    this.load.image('fire', 'sprites/fire.png');
    this.load.image('bullet', 'sprites/bullet.png');
    this.load.atlas('boom', 'sprites/boom.png', 'sprites/boom.json');
  }

  create() {
    this.scene.start('Start');
  }

}
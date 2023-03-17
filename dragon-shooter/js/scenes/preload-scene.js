export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.atlas('dragon', 'sprites/dragon.png', 'sprites/dragon.json');
    this.load.atlas('enemy', 'sprites/enemy.png', 'sprites/enemy.json');
  }

  create() {
    this.scene.start('Start');
  }

}
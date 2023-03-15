export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bg', 'sprites/background.png')
  }

  create() {
    this.scene.start('Preload');
  }

}
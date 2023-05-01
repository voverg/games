import Phaser from 'phaser';

import bgPng from '/bg.png';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bg', bgPng);
  }

  create() {
    this.scene.start('Preload');
  }

}
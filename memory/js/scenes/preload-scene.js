export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('card', 'sprites/card.png');
    this.load.image('card1', 'sprites/card1.png');
    this.load.image('card2', 'sprites/card2.png');
    this.load.image('card3', 'sprites/card3.png');
    this.load.image('card4', 'sprites/card4.png');
    this.load.image('card5', 'sprites/card5.png');

    this.load.audio('card', 'sounds/card.mp3');
    this.load.audio('complete', 'sounds/complete.mp3');
    this.load.audio('success', 'sounds/success.mp3');
    this.load.audio('theme', 'sounds/theme.mp3');
    this.load.audio('timeout', 'sounds/timeout.mp3');
  }

  create() {
    this.scene.start('Start');
  }

}
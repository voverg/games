export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  create(props) {
    console.log('Start scene', props);
    this.createBackground();
    this.createText();
    this.setEvents();
  }

  setEvents() {
    this.input.on('pointerdown', this.onScreenClick, this);
  }

  onScreenClick() {
    this.scene.start('Game');
  }

  createText() {
    const textConfig = {
      font: '48px Caveat',
      fill: '#fff',
    };

    const startGameText = this.add.text(this.sys.game.config.width / 2, 500, 'Кликни, чтобы начать игру', textConfig).setOrigin(0.5);
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

}
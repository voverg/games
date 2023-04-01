export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  init() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.textConfig = {
      font: '48px Caveat',
      fill: '#fff',
    };
  }

  create(props) {
    this.createBackground();

    if (props.score !== undefined) {
      this.createStats(props);
    }

    this.createText();
    this.setEvents();
  }

  createStats(props) {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRoundedRect(this.width / 2 - 300, this.height / 2 - 200, 600, 400);

    const titleText = props.completed ? 'Уроверь пройден' : 'Конец игры';
    const scoreText = `Очки ${props.score}`;
    this.add.text(this.width / 2, 250, titleText, this.textConfig).setOrigin(0.5);
    this.add.text(this.width / 2, 350, scoreText, this.textConfig).setOrigin(0.5);
  }

  setEvents() {
    this.input.on('pointerdown', this.onScreenClick, this);
  }

  onScreenClick() {
    this.scene.start('Game');
  }

  createText() {
    // const textConfig = {
    //   font: '48px Caveat',
    //   fill: '#fff',
    // };

    const startGameText = this.add.text(this.width / 2, 500, 'Кликни, чтобы начать игру', this.textConfig).setOrigin(0.5);
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

}
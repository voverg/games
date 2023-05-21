import Phaser from 'phaser';

export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  init() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.centerX = this.cameras.main.centerX;
    this.centerY = this.cameras.main.centerY;
  }

  create() {
    this.createBackground();
    this.createTitle();
    this.createBtns();
    this.setEvents();
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.add.graphics()
      .fillStyle(0x000000, 0.7)
      .fillRect(140, 100, 1000, 500);
  }

  createTitle() {
    const textStyle = {font: '46px Arial', fill: '#fff'};
    const text = 'Выберите режим игры'
    this.onePlayerBtn = this.add.text(this.centerX, 200, text, textStyle).setOrigin(0.5);
  }

  createBtns() {
    const textStyle = {font: '32px Arial', fill: '#fff'};

    this.onePlayerBtn = this.createButton({
      x: 300,
      y: this.height - 300,
      width: 210,
      text: 'Один игрок',
      textStyle
    });

    this.multiPlayerBtn = this.createButton({
      x: this.width - 500,
      y: this.height - 300,
      width: 240,
      text: 'Мультиплеер',
      textStyle
    });
  }

  createButton(props) {
    const btn = this.add.graphics()
      .fillStyle(0x00ff00, 0.5)
      .fillRoundedRect(props.x, props.y, props.width, 50)

    const padding = {x: 20, y: 7};
    const btnText = this.add.text(props.x + padding.x, props.y + padding.y, props.text, props.textStyle).setInteractive();

    return btnText;
  }

  setEvents() {
    this.onePlayerBtn.on('pointerdown', this.startGame, this);
    this.multiPlayerBtn.on('pointerdown', this.requestGame, this);
  }

  startGame() {
    this.scene.start('Game');
  }

  requestGame() {
    console.log('Request enemy from server');
  }


}
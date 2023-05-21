export class StatsPopup {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;

    this.x = 0;
    this.y = 0;
    this.width = 800;
    this.height = 500;
    this.padding = 50;
    this.bgColor = 0x000000;
    this.bgOpacity = 0.7;

    this.init();
  }

  init() {
    this.x = (this.scene.width - this.width) / 2;
    this.y = (this.scene.height - this.height) / 2;
    this.centerX = this.scene.cameras.main.centerX;
    this.centerY = this.scene.cameras.main.centerY;

    this.create();
    this.render();
    this.setEvents();
  }

  create() {
    this.createBackground();
    this.createText();
  }

  createBackground() {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(this.bgColor, this.bgOpacity);
    graphics.fillRect(this.x, this.y, this.width, this.height);
    graphics.setScrollFactor(0);
  }

  createText() {
    const titleConfig = {font: '46px Arial', fill: 'skyblue'};
    this.title = this.scene.add.text(this.centerX, this.centerY - 200, 'Уровень завершён!', titleConfig)
      .setScrollFactor(0)
      .setOrigin(0.5);

    const textNames = ['timeText', 'timeBestLapText'];
    const axis = {x: this.centerX, y: this.centerY - 70, step: 50};
    const textConfig = {font: '32px Arial', fill: '#fff'};

    textNames.forEach((textName, index) => {
      this[textName] = this.scene.add.text(axis.x, axis.y + axis.step * index, '', textConfig);
      this[textName].setScrollFactor(0).setOrigin(0.5);
    });

    this.title = this.scene.add.text(this.centerX, this.centerY + 150, 'Кликни, чтобы продолжить', textConfig)
      .setScrollFactor(0)
      .setOrigin(0.5);
  }

  render() {
    this.timeText.setText(`Общее время игры: ${this.stats.time.toFixed(2)}`);
    this.timeBestLapText.setText(`Лучшее время прохождения круга: ${this.stats.timeBestLap.toFixed(2)}`);
  }

  setEvents() {
    this.scene.input.once('pointerdown', () => {
      this.scene.scene.start('Game');
    });
  }

}
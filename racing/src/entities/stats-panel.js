export class StatsPanel {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;

    this.x = 10;
    this.y = 5;
    this.width = 300;
    this.height = 150;
    this.padding = 15;
    this.bgColor = 0x000000;
    this.bgOpacity = 0.3;

    this.create();
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
    const textNames = ['lapText', 'timeText', 'timeLapText', 'timeBestLapText'];
    const axis = {x: this.x + this.padding, y: this.y + this.padding, step: 30};
    const textConfig = {
      font: '24px Arial',
      fill: '#fff',
    };

    textNames.forEach((textName, index) => {
      this[textName] = this.scene.add.text(axis.x, axis.y + axis.step * index, '', textConfig);
      this[textName].setScrollFactor(0);
    });
  }

  render() {
    this.lapText.setText(`Круги: ${this.stats.lap} / ${this.stats.laps}`);
    this.timeText.setText(`Общее время: ${this.stats.time.toFixed(2)}`);
    this.timeLapText.setText(`Текущий круг: ${this.stats.timeLap.toFixed(2)}`);
    this.timeBestLapText.setText(`Лучшее время: ${this.stats.timeBestLap.toFixed(2)}`);
  }

}
export class StatsPanel {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;

    this.x = 15;
    this.y = 5;
    this.width = 250;
    this.height = 150;
    this.padding = 10;
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
    const textConfig = {
      font: '24px Arial',
      fill: '#fff',
    };

    const axis = {x: this.x + this.padding, y: this.y + this.padding, step: 30};

    this.lapText = this.scene.add.text(axis.x, axis.y, `Laps: 0/0`, textConfig).setScrollFactor(0);
    this.timeText = this.scene.add.text(axis.x, axis.y + axis.step, `Time: 0.0`, textConfig).setScrollFactor(0);
    this.timeLapText = this.scene.add.text(axis.x, axis.y + axis.step * 2, `Lap time: 0.0`, textConfig).setScrollFactor(0);
    this.timeBestLapText = this.scene.add.text(axis.x, axis.y + axis.step * 3, `Best lap time: 0.0`, textConfig).setScrollFactor(0);
  }

  render() {
    this.lapText.setText(`Laps: ${this.stats.lap} / ${this.stats.laps}`);
    this.timeText.setText(`Time: ${this.stats.time.toFixed(2)}`);
    this.timeLapText.setText(`Lap time: ${this.stats.timeLap.toFixed(2)}`);
    this.timeBestLapText.setText(`Best lap time: ${this.stats.timeBestLap.toFixed(2)}`);
  }

}
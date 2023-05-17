export class StatsPanel {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }

  create() {
    this.createText();
  }

  createText() {
    const textConfig = {
      font: '24px Arial',
      fill: '#fff',
    };

    const axios = {x: 20, y: 10, step: 30};

    this.lapText = this.scene.add.text(axios.x, axios.y, `Laps: 0/0`, textConfig).setScrollFactor(0);
    this.timeText = this.scene.add.text(axios.x, axios.y + axios.step, `Time: 0.0`, textConfig).setScrollFactor(0);
    this.timeLapText = this.scene.add.text(axios.x, axios.y + axios.step * 2, `Lap time: 0.0`, textConfig).setScrollFactor(0);
    this.timeBestLapText = this.scene.add.text(axios.x, axios.y + axios.step * 3, `Best lap time: 0.0`, textConfig).setScrollFactor(0);
  }

  render() {
    this.lapText.setText(`Laps: ${this.stats.lap} / ${this.stats.laps}`);
    this.timeText.setText(`Time: ${this.stats.time.toFixed(2)}`);
    this.timeLapText.setText(`Lap time: ${this.stats.timeLap.toFixed(2)}`);
    this.timeBestLapText.setText(`Best lap time: ${this.stats.timeBestLap.toFixed(2)}`);
  }

}
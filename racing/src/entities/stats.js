export class Stats {
  constructor(scene, laps) {
    this.scene = scene;
    this.laps = laps;
    this.lap = 1;
    this.time = 0;
    this.timeLap = 0;
    this.timeLastLap = 0;
    this.timeBestLap = 0;
  }

  get complete() {
    return this.lap > this.laps;
  }

  onLapComplete() {
    if (!this.timeBestLap || this.timeBestLap > this.timeLap) {
      this.timeBestLap = this.timeLap;
    }

    ++this.lap;
    this.timeLastLap = this.timeLap;
    this.timeLap = 0;
  }

  update(deltaTime) {
    if (!this.complete) {
      const time = deltaTime / 1000; // Convert miliseconds to seconds
      this.time += time;
      this.timeLap += time;
    }
  }

}
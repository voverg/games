export class Tank {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
  }

  render() {
    this.canvas.drawTank();
  }
}
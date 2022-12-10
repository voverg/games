export class Tank {
  constructor(canvas) {
    this.canvas = canvas;
  }

  render() {
    this.canvas.drawTank();
  }
}
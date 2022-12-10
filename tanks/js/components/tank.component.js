export class Tank {
  constructor() {
    this.canvas = null;
  }

  init(controllers) {
    this.canvas = controllers.canvas;
  }

  render() {
    this.canvas.drawTank();
  }
}
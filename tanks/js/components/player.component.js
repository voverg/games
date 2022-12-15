export class PlayerComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
  }

  render() {
    this.canvas.drawPlayer();
  }
}
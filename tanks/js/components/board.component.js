export class BoardComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.grid = models.grid;
  }

  render() {
    this.grid.arr.forEach((cell) => {
      if (cell.type) {
        cell.render();
      }
    });

    this.canvas.drawBase();
  }
}
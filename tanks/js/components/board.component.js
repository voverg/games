export class Board {
  constructor() {
    this.canvas = null;
  }

  init(controllers, models) {
    this.canvas = controllers.canvas;
    this.grid = models.grid;
  }

  render() {
    this.grid.arr.forEach((cell) => {
      if (cell.type) {
        cell.render();
      }
    });
  }
}
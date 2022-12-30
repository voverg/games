export class PlantComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
    this.grid = models.grid;
  }

  render() {
    this.grid.arr.forEach((cell) => {
      if (cell.type === 'plant') {
        cell.render();
      }
    });
  }
}
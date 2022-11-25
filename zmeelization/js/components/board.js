export class Board {
  constructor() {
    this.canvas = null;
    this.sprites = null;
    this.cells = null;
  }

  init(components, models) {
    this.canvas = components.canvas;
    this.sprites = models.sprites;
    this.cells = models.cells;
  }

  render() {
    this.cells.forEach((cell) => {
      this.canvas.drawImage(this.sprites.getElem('cell'), cell.x, cell.y);
      
      if (cell.hasFood) {
        this.canvas.drawImage(this.sprites.getElem('food'), cell.x, cell.y);
      }
    });
  }

}
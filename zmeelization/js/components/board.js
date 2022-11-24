export class Board {
  constructor() {
    this.canvas = null;
    this.sprites = null;
    this.cells = [];
  }

  init(canvas, cells, sprites) {
    this.canvas = canvas;
    this.sprites = sprites;
    this.cells = cells;
  }

  render() {
    this.cells.forEach((cell) => {
      this.canvas.drawImage(this.sprites.getElem('cell'), cell.x, cell.y);
    });
  }

}
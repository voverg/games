export class Board {
  constructor() {
    this.sprites = null;
    this.cells = null;
  }

  init( _, models ) {
    this.sprites = models.sprites;
    this.cells = models.cells;
  }

  render() {
    this.cells.forEach((cell) => {
      cell.render(this.sprites.getElem('cell'));
      
      if (cell.type) {
        cell.render(this.sprites.getElem(cell.type));
      }
    });
  }

}
export class SnakeModel {
  constructor() {
    this.cells = null;
    this.snakes = [];

    this.direction = 'up';
  }

  init( _, models ) {
    this.cells = models.cells;
    const startCells = [
      {row: 7, col: 7},
      {row: 8, col: 7}
    ];

    startCells.forEach((startCell) => {
      const cell = this.cells.get(startCell.row, startCell.col);
      this.snakes.push(cell);
    });
  }

  hasCell(cell) {
    return this.snakes.find((item) => item.id === cell.id);
  }

  get length() {
    return this.snakes.length;
  }

  forEach(fn) {
    this.snakes.forEach(fn);
  }

  unshift(elem) {
    this.snakes.unshift(elem);
  }

  pop() {
    this.snakes.pop();
  }

}
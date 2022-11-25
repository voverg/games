import {Cell} from '../components/cell.js';

export class Cells {
  constructor() {
    this.canvas = null;
    this.sprites = null;
    this.cells = [];
    this.size = 15;
    this.direction = {
      up: {
        row: -1,
        col: 0
      },
      down: {
        row: 1,
        col: 0
      },
      left: {
        row: 0,
        col: -1
      },
      right: {
        row: 0,
        col: 1
      }
    };
  }

  init(components, models) {
    this.canvas = components.canvas;
    this.sprites = models.sprites;

    this._createCells()
  }

  _createCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push(this._createCell(row, col));
      }
    }
  }

  _createCell(row, col) {
    const cellProps = {
      row,
      col,
      elem: this.sprites.getElem('cell'),
      // offsetX: (this.canvas.width - this.size * this.sprites.getWidth('cell')) / 2,
      // offsetY: (this.canvas.height - this.size * this.sprites.getHeight('cell')) / 2,
      offsetX: 0,
      offsetY: 0,
      id: `${row + 1}:${col + 1}`,
      hasFood: false,
    }

    return new Cell(cellProps);
  }

  get(row, col) {
    return this.cells.find((cell) => cell.row === row && cell.col === col);
  }

  getByIndex(index) {
    return this.cells[index];
  }

  getNext(prevCell, goto) {
    const row = prevCell.row + this.direction[goto].row;
    const col = prevCell.col + this.direction[goto].col;

    return this.get(row, col);
  }

  get length() {
    return this.cells.length;
  }

  forEach(callback) {
    this.cells.forEach(callback);
  }

  filter(fn) {
    return this.cells.filter(fn);
  }

}
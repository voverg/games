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

  init(canvas, sprites) {
    this.canvas = canvas;
    this.sprites = sprites;

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
      offsetX: (this.canvas.width - this.size * this.sprites.getWidth('cell')) / 2,
      offsetY: (this.canvas.height - this.size * this.sprites.getHeight('cell')) / 2,
    }

    return new Cell(cellProps);
  }

  forEach(callback) {
    this.cells.forEach(callback);
  }

  get(row, col) {
    return this.cells.find((cell) => cell.row === row && cell.col === col);
  }

  getNext(prevCell, goto) {
    const row = prevCell.row + this.direction[goto].row;
    const col = prevCell.col + this.direction[goto].col;

    return this.get(row, col);
  }

}
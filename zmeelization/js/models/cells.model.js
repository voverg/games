import {Model} from '../core/model.js';

export class Cells extends Model {
  constructor() {
    super();
    this.size = 15;
    this.direction = {
      up: {
        row: -1,
        col: 0,
        angle: 0,
      },
      down: {
        row: 1,
        col: 0,
        angle: 180,
      },
      left: {
        row: 0,
        col: -1,
        angle: 270,
      },
      right: {
        row: 0,
        col: 1,
        angle: 90,
      }
    };
  }

  get(row, col) {
    return this.arr.find((cell) => cell.row === row && cell.col === col);
  }

  getNext(prevCell, goto) {
    const row = prevCell.row + this.direction[goto].row;
    const col = prevCell.col + this.direction[goto].col;

    return this.get(row, col);
  }

}
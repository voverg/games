import {Model} from '../core/model.js';

export class SnakeModel extends Model {
  constructor() {
    super();
    this.direction = 'up';
    this.moving = false;
    this.score = 0;
    this.headAngle = {up: 0, down: 180, left: 270, right: 90};
    this.startCells = [
      {row: 7, col: 7},
      {row: 8, col: 7}
    ];
  }

  hasCell(cell) {
    return this.arr.find((item) => item.id === cell.id);
  }

  setDefault() {
    this.arr = [];
  }

}
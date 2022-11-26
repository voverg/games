import {Model} from '../core/model.js';

export class SnakeModel extends Model {
  constructor() {
    super();
    this.direction = 'up';
    this.moving = false;
    this.headAngle = {up: 0, down: 180, left: 270, right: 90};
  }

  hasCell(cell) {
    return this.arr.find((item) => item.id === cell.id);
  }

}
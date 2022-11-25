import {Utils} from '../utils/utils.js';

export class FoodModel {
  constructor() {
    this.cells = null;
    this.snakes = null;
  }

  init( _, models ) {
    this.cells = models.cells;
    this.snakes = models.snake;
  }

  create() {
    const avalableCells = this.cells.filter((cell) => !this.snakes.hasCell(cell));
    const randomIndex = Utils.random(0, avalableCells.length);
    // const cell = this.cells.getByIndex(randomIndex);
    const cell = avalableCells[randomIndex];
    this.cells.forEach((elem) => elem.hasFood = elem.id === cell.id ? true : false);
  }
}
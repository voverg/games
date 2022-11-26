import {Cell} from '../components/cell.js';
import {Utils} from '../utils/utils.js';

export class BoardController {
  constructor() {
    this.canvas = null;

    this.sprites = null;
    this.cells = null;
    this.snakes = null;

    this.score = 0;
  }

  init( components, models ) {
    this.canvas = components.canvas;
    this.sprites = models.sprites;
    this.cells = models.cells;
    this.snakes = models.snake;

    this._createCells();
    this._createSnake();
    this._createFood();
  }

  _createCells() {
    for (let row = 0; row < this.cells.size; row++) {
      for (let col = 0; col < this.cells.size; col++) {
        this.cells.push(this._createCell(row, col));
      }
    }
  }

  _createCell(row, col) {
    const cellProps = {
      row,
      col,
      elem: this.sprites.getElem('cell'),
      offsetX: 0,
      offsetY: 0,
      id: `${row + 1}:${col + 1}`,
      hasFood: false,
      canvas: this.canvas,
    }

    return new Cell(cellProps);
  }

  _createSnake() {
    const startCells = [
      {row: 7, col: 7},
      {row: 8, col: 7}
    ];

    startCells.forEach((startCell) => {
      const cell = this.cells.get(startCell.row, startCell.col);
      this.snakes.push(cell);
    });
  }

  _createFood() {
    const avalableCells = this.cells.filter((cell) => !this.snakes.hasCell(cell));
    const randomIndex = Utils.random(0, avalableCells.length - 1);
    const foodCell = avalableCells[randomIndex];
    this.cells.forEach((cell) => cell.hasFood = cell.id === foodCell.id ? true : false);
  }

  move() {
    if (!this.snakes.moving) {
      return;
    }

    const snakeHead = this.snakes.getByIndex(0);
    const nextCell = this.cells.getNext(snakeHead, this.snakes.direction);

    if (nextCell) {
      this.snakes.unshift(nextCell);
      if (!nextCell.hasFood) {
        this.snakes.pop();
      } else {
        this._createFood();
        this.score += 1;
      }
    }
  }

}
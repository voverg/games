import {Cell} from '../components/cell.js';
import {Utils} from '../utils/utils.js';

export class BoardController {
  constructor() {
    this.canvas = null;

    this.sprites = null;
    this.cells = null;
    this.snakes = null;
  }

  init( components, models ) {
    this.canvas = components.canvas;
    this.sprites = models.sprites;
    this.cells = models.cells;
    this.snakes = models.snake;

    // this.createCells();
    // this.createSnake();
    // this.createFood();
    // this.createBomb();
  }

  createCells() {
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
      type: false,
      canvas: this.canvas,
    }

    return new Cell(cellProps);
  }

  createSnake() {
    this.snakes.startCells.forEach((startCell) => {
      const cell = this.cells.get(startCell.row, startCell.col);
      this.snakes.push(cell);
    });
  }

  createFood() {
    this._createCellObject('food');
  }

  createBomb() {
    this._createCellObject('bomb');
  }

  _createCellObject(type) {
    // Clear type of the current cell if exict
    const typedCell = this.cells.find((cell) => cell.type === type);
    if (typedCell) {
      typedCell.type = false;
    }
    // Get random avalable cell and set its type
    const cell = this._getAvalableCell();
    cell.type = type;
  }

  _getAvalableCell() {
    const avalableCells = this.cells.filter((cell) => {
      return !this.snakes.hasCell(cell) && !cell.type;
    });

    const randomIndex = Utils.random(0, avalableCells.length - 1);
    return avalableCells[randomIndex];
  }

}
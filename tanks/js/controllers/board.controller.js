import { Controller } from './controller.js';

export class BoardController extends Controller {
  constructor() {
    super();
    this.levels = null;
    this.grid = null;
  }

  init(props) {
    super.init(props);
    this.levels = this.models.levels;
    this.grid = this.models.grid;

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    this.createGrid();
    this.createEnemy();
  }

  createGrid() {
    this.levels.map.forEach((row, rowIndex) => {
      row.forEach((type, colIndex) => {
        const cell = this._createCell(rowIndex, colIndex, type);
        this.grid.addCell(cell);
      });
    });
  }

  _createCell(row, col, type) {
    const types = {0: null, 1: 'brick', 2: 'tile'};
    const cellProps = {
      row,
      col,
      canvas: this.canvas,
      type: types[type],
      size: this.sources.sprite.tile_size,
      id: `${row + 1}:${col + 1}`,
    };

    return new this.entities.Cell(cellProps);
  }

  createEnemy() {
    const enemy = new this.entities.Enemy({
      canvas: this.canvas,
      direction: 'left',
      size: this.sources.sprite.unit_size,
      type: 'enemy',
      x: this.canvas.width - this.sources.sprite.unit_size,
      y: 0,
    });

    this.models.enemy.addEnemy(enemy);
  }

}
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
    this.createPlayer();
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

  createPlayer() {
    const player = new this.entities.Tank({
      canvas: this.canvas,
      spriteMap: 'playerMap',
      direction: 'up',
      isMoving: false,
      size: this.sources.sprite.unit_size,
      type: 'player',
      step: 2,
      x: 128,
      y: 384,
    });

    this.models.player.addTank(player);
  }

  createEnemy() {
    const enemy = new this.entities.Tank({
      canvas: this.canvas,
      spriteMap: 'enemyMap',
      direction: 'left',
      isMoving: true,
      size: this.sources.sprite.unit_size,
      type: 'enemy',
      step: 2,
      x: this.canvas.width - this.sources.sprite.unit_size,
      y: 0,
    });

    this.models.enemy.addTank(enemy);
  }

  update() {}

}
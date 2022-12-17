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
    this.createEnemy(this.canvas.width - this.sources.sprite.unit_size, 0);

    // this.createEnemy((this.canvas.width - this.sources.sprite.unit_size) / 2, 0);
    // const enemyInterval = setInterval(() => {
    //   this.createEnemy(this.canvas.width - this.sources.sprite.unit_size, 0);
    // }, 3000);
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
      life: 1,
      step: 2,
      shoot: false,
      x: 128,
      y: 384,
    });

    this.models.player.addTank(player);
  }

  createEnemy(x, y) {
    const enemy = new this.entities.Tank({
      canvas: this.canvas,
      spriteMap: 'enemyMap',
      direction: 'left',
      isMoving: true,
      size: this.sources.sprite.unit_size,
      type: 'enemy',
      life: 1,
      step: 2,
      shoot: false,
      x: x,
      y: y,
    });

    this.models.enemy.addTank(enemy);
  }

  update() {
    if (!this.models.enemy.length) {
      this.createEnemy(this.canvas.width - this.sources.sprite.unit_size, 0);
    }

    if (!this.models.player.length) {
      this.createPlayer();
    }
  }

}
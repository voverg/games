import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

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
    const levelMap = this.levels.getMap(this.state.level);
    levelMap.forEach((row, rowIndex) => {
      row.forEach((type, colIndex) => {
        const cell = this._createCell(rowIndex, colIndex, type);
        this.grid.addCell(cell);
      });
    });
  }

  _createCell(row, col, type) {
    const types = {0: null, 1: 'brick', 2: 'tile', 3: 'water', 4: null};
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
      type: 'player',
      x: 128,
      y: 384,
    });

    this.models.player.addTank(player);
  }

  createEnemy(x, y) {
    const types = ['enemy_1', 'enemy_2', 'enemy_3', 'enemy_4'];
    const type = types[Utils.random(0, types.length - 1)];
    const enemy = new this.entities.Tank({
      canvas: this.canvas,
      type: type,
      x: x,
      y: y,
    });

    this.models.enemy.addTank(enemy);
  }

  update() {
    if (!this.models.enemy.length && this.state.enemyAmount) {
      this.createEnemy(this.canvas.width - this.sources.sprite.unit_size, 0);
    } else if (!this.state.enemyAmount) {
      this.actions.setGameOver(true);
      this.actions.setWin(true);
    }

    if (!this.models.player.length) {
      this.createPlayer();
    }
  }

}
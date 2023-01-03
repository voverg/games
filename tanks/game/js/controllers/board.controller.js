import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class BoardController extends Controller {
  constructor() {
    super();
    this.levels = null;
    this.grid = null;
    this.enemyMap = null;
  }

  init(props) {
    super.init(props);
    this.levels = this.models.levels;
    this.grid = this.models.grid;
    this.enemyMap = this.levels.getEnemies(this.state.level);

    // console.log('width: ', this.levels.getMapWidth(1), 'height: ', this.levels.getMapHeight(1));

    this.store.subscribe(() => {
      this.state = this.store.getState();

      if (this.state.isGameOver && !this.state.isWin) {
        this.models.base.spriteIndex = 1;
      }
    });

    this.createGrid();
    this.createPlayer();
    this.createEnemies();
  }

  

  createGrid() {
    const level = this.state.level;
    const levelMap = this.levels.getMap(level);
    
    levelMap.forEach((row, rowIndex) => {
      row.forEach((type, colIndex) => {
        const cell = this._createCell(rowIndex, colIndex, type);
        this.grid.addCell(cell);
      });
    });
  }

  _createCell(row, col, type) {
    const types = {0: null, 1: 'brick', 2: 'tile', 3: 'water', 4: 'plant'};
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

  createEnemies() {
    const enemySize = this.sources.sprite.unit_size;
    const width = this.canvas.width;
    const appearancePos = [0, Math.floor(width / 2 - 30), width - enemySize];
    let enemyMapIndex = 0;

    const enemyInterval = setInterval(() => {
      const randomX = appearancePos[Utils.random(0, appearancePos.length - 1)];

      if (this.state.enemyAmount && this.models.enemy.length < 3) {
        this.createEnemy(randomX, 0, enemyMapIndex);
        this.actions.setEnemyAmount(this.state.enemyAmount - 1);
        enemyMapIndex++;
      } else if (!this.state.enemyAmount && !this.models.enemy.length) {
        this.actions.setGameOver(true);
        this.actions.setWin(true);
        clearInterval(enemyInterval);
      }
    }, 3000);
  }

  createEnemy(x, y, enemyMapIndex) {
    const directions = ['up', 'right', 'down', 'left'];
    const types = ['enemy_1', 'enemy_2', 'enemy_3', 'enemy_4'];
    // const type = types[Utils.random(0, types.length - 1)]; // Random tank type
    const type = types[this.enemyMap[enemyMapIndex]];
    let bonus = false;
    if (new Set([17, 10, 3]).has(this.state.enemyAmount)) {
      bonus = true;
    }

    const enemy = new this.entities.Tank({
      canvas: this.canvas,
      bonus: bonus,
      type: type,
      x: x,
      y: y,
    });

    this.models.enemy.addTank(enemy);

    setTimeout(() => {
      this.models.enemy.getAll().forEach((enemy) => {
        enemy.isMoving = true;
        const direction = directions[Utils.random(0, directions.length - 1)];
        enemy.direction = direction;
      });
    }, 500);
  }

  update() {
    if (!this.models.player.length) {
      this.actions.setGameOver(true);
      // this.createPlayer();
    }
  }

}
import { Controller } from './controller.js';

export class BoardController extends Controller {
  init(props) {
    super.init(props);
    this.selectedTileId = '';

    this.createGrid();
    this.addGridObjects();
    this.components.board.render();
  }

  createGrid() {
    for (let row = 0; row < 13; row++) {
      for (let col = 0; col < 13; col++) {
        const cell = this.createCell(row, col);
        this.models.board.add(cell);
      }
    }
  }

  createCell(row, col) {
    const props = {
      type: 'tile',
      code: 'a',
      row,
      col,
    };

    return new this.entities.Tile(props);
  }

  addGridObjects() {
    const objArray = [
      {id: '12:6', code: 'base'},
      {id: '12:5', code: 'c'},
      {id: '11:6', code: 'd'},
      {id: '12:7', code: 'e'},
      {id: '11:5', code: 'n'},
      {id: '11:7', code: 'o'},
      {id: '12:4', code: 'player'},
      {id: '0:0', code: 'enemy'},
      {id: '0:5', code: 'enemy'},
      {id: '0:12', code: 'enemy'},
    ];

    objArray.forEach((obj) => {
      this.models.board.setCode(obj.id, obj.code);
    });
  }

  update() {
    if (this.isClickBoard() && !this.hasForbiddenObj()) {
      this.setTile();
      this.components.board.render();
    }
  }

  setTile() {
    const asideTileCode = this.models.aside.get(this.state.asideTileId).code;
    this.models.board.setCode(this.state.boardTileId, asideTileCode);
  }

  isClickBoard() {
    return this.state.clickTarget === 'board';
  }

  hasForbiddenObj() {
    const boardTileId = this.state.boardTileId;
    const boardTileCode = this.models.board.get(boardTileId).code;
    return new Set(['enemy', 'player', 'base']).has(boardTileCode);
  }

}
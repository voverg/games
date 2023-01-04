import { Controller } from './controller.js';

export class BoardController extends Controller {
  init(props) {
    super.init(props);
    this.selectedTileId = '';

    this.createGrid();
    this.components.board.render();
  }

  createGrid() {
    for (let row = 0; row < 13; row++) {
      for (let col = 0; col < 13; col++) {
        const cell = this.createCell(row, col);
        this.models.grid.add(cell);
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

  update() {
    // this.setTile();
    const code = this.models.aside.get(this.state.asideTileId).code;
    this.models.grid.setCode(this.state.boardTileId, code);
    this.components.board.render();
  }

  setTile() {
    const code = this.models.aside.get(this.state.asideTileId).code;
    this.models.grid.setCode(this.state.boardTileId, code);
  }

}
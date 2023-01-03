import { Controller } from './controller.js';

export class BoardController extends Controller {
  init(props) {
    super.init(props)

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
      code: 'd',
      row,
      col,
    };

    return new this.entities.Tile(props);
  }

  update() {
    this.components.board.render();
  }

}
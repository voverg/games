import { Controller } from './controller.js';

export class AsideController extends Controller {
  init(props) {
    super.init(props)

    this.createGrid();
    this.components.aside.render();
  }

  createGrid() {
    const tileCodes = 'abcdefghijklm'.split('');

    tileCodes.forEach((code, index) => {
      const tile = this.createTile(index, index, code);
      this.models.aside.add(tile);
    });
  }

  createTile(row, col, code) {
    const props = {
      type: 'tile',
      code,
      row,
      col,
    };

    return new this.entities.Tile(props);
  }

  update() {
    this.components.aside.render();
  }

}
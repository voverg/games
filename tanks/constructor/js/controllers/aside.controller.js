import { Controller } from './controller.js';

export class AsideController extends Controller {
  init(props) {
    super.init(props);

    this.createGrid();
    this.components.aside.render();
  }

  createGrid() {
    const tileCodes = 'bcdefghijklma'.split('');

    tileCodes.forEach((code, index) => {
      const tile = this.createTile(index, index, code);
      this.models.aside.add(tile);
    });

    this.selectedTileId = this.state.asideTileId;
    this.models.aside.select(this.selectedTileId);
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
    if (this.selectedTileId !== this.state.asideTileId) {
      this.selectedTileId = this.state.asideTileId;
      this.models.aside.select(this.state.asideTileId);
      this.components.aside.render();
    }

  }

}
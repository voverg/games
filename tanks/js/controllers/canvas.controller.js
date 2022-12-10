import { Controller } from './controller.js';

export class Canvas extends Controller {
  constructor() {
    super();
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  init(props) {
    super.init(props);
    this.sprite = this.sources.sprite;
    this.levels = this.models.levels;

    this.canvas.width = this.levels.map[0].length * this.sprite.tile_size;
    this.canvas.height = this.levels.map.length * this.sprite.tile_size;

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  drawTank() {
    const direction = this.state.tankDirection;

    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite.tankMap[direction].x,
      spriteOffsetY: this.sprite.tankMap[direction].y,
      width: this.sprite.unit_size,
      height: this.sprite.unit_size,
      x: this.state.tankCoords.x,
      y: this.state.tankCoords.y,
    });
  }

  drawCell(x, y, type) {
    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite.wallMap[type].x,
      spriteOffsetY: this.sprite.wallMap[type].y,
      width: this.sprite.tile_size,
      height: this.sprite.tile_size,
      x: x,
      y: y,
    });
  }

  drawObj( {sprite, spriteOffsetX, spriteOffsetY, width, height, x, y} ) {
    this.ctx.drawImage(
      sprite,
      spriteOffsetX, spriteOffsetY, width, height,
      x, y, width, height
    );
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

}
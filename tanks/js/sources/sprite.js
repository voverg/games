export class Sprite {
  constructor() {
    this.src = 'img/sprite.png';
    this.sprite = new Image();

    this.unit_size = 32;
    this.tile_size = 16;

    this.tankMap = {
      up: {x: 0 * this.unit_size, y: 0 * this.unit_size},
      right: {x: 2 * this.unit_size, y: 0 * this.unit_size},
      down: {x: 4 * this.unit_size, y: 0 * this.unit_size},
      left: {x: 6 * this.unit_size, y: 0 * this.unit_size},
    };
    this.wallMap = {
      brick: {x: 8 * this.unit_size, y: 4 * this.unit_size},
      tile: {x: 8 * this.unit_size, y: 4.5 * this.unit_size},
    };
  }

  async load() {
    return new Promise((resolve, reject) => {
        this.sprite.src = this.src;
        this.sprite.addEventListener('load', () => resolve(this));
    });
  }

  getElem() {
    return this.sprite;
  }
}
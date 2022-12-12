export class Sprite {
  constructor() {
    this.src = 'img/sprite.png';
    this.sprite = new Image();

    this.unit_size = 32;
    this.tile_size = 16;

    this.wallMap = {
      brick: {x: 8 * this.unit_size, y: 4 * this.unit_size},
      tile: {x: 8 * this.unit_size, y: 4.5 * this.unit_size},
    };
    this.tankMap = {
      up: {x: 0 * this.unit_size, y: 0 * this.unit_size},
      right: {x: 2 * this.unit_size, y: 0 * this.unit_size},
      down: {x: 4 * this.unit_size, y: 0 * this.unit_size},
      left: {x: 6 * this.unit_size, y: 0 * this.unit_size},
    };
    this.bulletMap = {
      up: {x: 32 * this.tile_size, y: 0 * this.tile_size},
      right: {x: 33 * this.tile_size, y: 0 * this.tile_size},
      down: {x: 34 * this.tile_size, y: 0 * this.tile_size},
      left: {x: 35 * this.tile_size, y: 0 * this.tile_size},
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
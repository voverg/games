export class Sprite {
  constructor(src) {
    this.src = src;
    this.sprite = new Image();

    this.tankWidth = 30;
    this.tankHeight = 30;
    this.tankOffset = {
      up: {x: 0, y: 0},
      down: {x: 130, y: 0},
      left: {x: 195, y: 0},
      right: {x: 60, y: 0},
    }
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
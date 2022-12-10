import { Sprite } from './sprite.js';

export class Canvas {
  constructor(store) {
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sprite = new Sprite('img/sprite.png');
    this.store = store;
    this.state = this.store.getState();

    this.init();
  }

  async load() {
    await this.sprite.load();
  }

  init() {
    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  drawTank() {
    const direction = this.state.tankDirection;
    const spriteWidth = this.sprite.tankWidth;
    const spriteHeight = this.sprite.tankHeight;
    const spriteOffsetX = this.sprite.tankOffset[direction].x;
    const spriteOffsetY = this.sprite.tankOffset[direction].y;
    // console.log(this.sprite.tankOffset[direction]);

    this.ctx.drawImage(
      this.sprite.getElem(),
      spriteOffsetX, spriteOffsetY, spriteWidth, spriteHeight,
      this.state.tankCoords.x, this.state.tankCoords.y, 30, 30
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

  update() {}
}
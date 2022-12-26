import { Utils } from '../utils/utils.js';

export class Bonus {
  constructor({canvas}) {
    this.canvas = canvas;
    this.type = null;
    this.size = 32;
    this.x = 0;
    this.y = 100;
    this.id = null;
    this.spriteIndex = 0;
    this.types = ['helmet', 'watch', 'shovel', 'star', 'grenade', 'tank'];

    this.init();
  }

  init() {
    this.upSide = this.y;
    this.rightSide = this.x + this.size;
    this.downSide = this.y + this.size;
    this.leftSide = this.x;

    this.spriteIndex = Utils.random(0, this.types.length - 1);
    this.type = this.types[this.spriteIndex];
    this.id = `${this.x}:${this.y}:${Utils.random(0, 100)}`;
  }

  render() {
    this.canvas.drawBonus({
      x: this.x,
      y: this.y,
      size: this.size,
      index: this.spriteIndex + 16,
    });
  }

}
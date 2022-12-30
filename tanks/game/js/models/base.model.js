export class BaseModel {
  constructor() {
    this.x = 192;
    this.y = 384;
    this.size = 32;
    this.spriteIndex = 0;

    this.init();
  }

  init() {
    this.upSide = this.y;
    this.rightSide = this.x + this.size;
    this.downSide = this.y + this.size;
    this.leftSide = this.x;
  }
}
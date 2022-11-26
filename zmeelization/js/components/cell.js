export class Cell {
  constructor({row, col, elem, offsetX, offsetY, id, hasFood, canvas}) {
    this.elem = elem;
    this.size = elem.width + 1;
    this.row = row;
    this.col = col;

    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.x = 0;
    this.y = 0;

    this.id = id;
    this.hasFood = hasFood;
    this.canvas = canvas;

    this._setCoordinates();
  }

  init() {}

  _setCoordinates() {
    this.x = this.size * this.col + this.offsetX;
    this.y = this.size * this.row + this.offsetY;
  }

  rotate(sprite, deg) {
    const rad = deg * Math.PI / 180;
    const halfSize = sprite.width / 2;

    this.canvas.ctx.save();

    this.canvas.ctx.translate(this.x, this.y);
    this.canvas.ctx.translate(halfSize, halfSize);
    this.canvas.ctx.rotate(rad);
    
    this.canvas.drawImage(sprite, -halfSize, -halfSize);
    this.canvas.ctx.restore();
  }

  render(sprite) {
    this.canvas.drawImage(sprite, this.x, this.y);
  }
}
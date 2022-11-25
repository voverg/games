export class Cell {
  constructor({row, col, elem, offsetX, offsetY, id, hasFood}) {
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

    this._setCoordinates();
  }

  init() {}

  _setCoordinates() {
    this.x = this.size * this.col + this.offsetX;
    this.y = this.size * this.row + this.offsetY;
  }
}
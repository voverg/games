export class Canvas {
  constructor() {
    this.canvas = document.querySelector('#my-canvas');
    this.ctx = this.canvas.getContext('2d');

    this._width = 0;
    this._height = 0;
    this.size = 15;
    this.cellSize = 19;
    this.canvas.width = this.size * this.cellSize;
    this.canvas.height = this.size * this.cellSize;

    this.dimensions = {
      max: {
        width: 500,
        height: 500,
      },
      min: {
        width: 300,
        height: 300
      }
    }
  }

  init() {}

  render() {}

  drawImage(elem, x, y) {
    this.ctx.drawImage(elem, x, y);
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
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
        width: 640,
        height: 360
      },
      min: {
        width: 300,
        height: 300
      }
    }

    // this._initDemensions();
  }

  init() {}

  _initDemensions() {
    const data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight,
    }

    if (data.realWidth/data.realHeight > data.maxWidth/data.maxHeight) {
      this._fitWidth(data);
    } else {
      this._fitHeight(data);
    }

    this.canvas.width = this._width;
    this.canvas.height = this._height;
  }

  _fitWidth(data) {
    this._height = Math.round(this._width * data.realHeight / data.realWidth);
    this._height = Math.min(this._height, data.maxHeight);
    this._height = Math.max(this._height, data.minHeight);
    
    this._width = Math.round(data.realWidth * this._height / data.realHeight);
    this.canvas.style.width = '100%';
  }

  _fitHeight(data) {
    this._width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
    this._width = Math.min(this._width, data.maxWidth);
    this._width = Math.max(this._width, data.minWidth);

    this._height = Math.round(this._width * data.realHeight / data.realWidth);
    this.canvas.style.height = '100%';
  }

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
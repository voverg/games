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

    this._initDemensions();
  }

  init() {}

  render() {}

  _initDemensions() {
    const $header = document.querySelector('.header');
    const $footer = document.querySelector('.footer');
    const $main = document.querySelector('.main');
    const $controls = document.querySelector('.controls');

    const data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight,
      headerHeight: $header.clientHeight,
      footerHeight: $footer.clientHeight,
      controlsWidth: $controls.clientWidth,
    }

    if (data.realWidth < data.realHeight) {
      this.fitWidth(data);
    } else {
      this.fitHeight(data);
    }

    this.canvas.style.width = `${this._width}px`;
    this.canvas.style.height = `${this._height}px`;
  }

  fitWidth(data) {
    const width = data.realWidth - 50;
    this._width = width > data.maxWidth ? data.maxWidth : width;
    this._height = this._width;
  }

  fitHeight(data) {
    const height = data.realHeight - data.headerHeight - data.footerHeight - 50;
    this._height = height > data.maxHeight ? data.maxHeight : height;
    this._width = this._height;
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
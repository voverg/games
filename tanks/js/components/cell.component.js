export class Cell {
  constructor(canvas) {
    this.canvas = canvas;
  }

  init(controllers) {
    this.canvas = controllers.canvas;
  }

  create(props) {
    return new _Cell({canvas: this.canvas, ...props});
  }

  render() {}
}

class _Cell {
  constructor(props) {
    this.canvas = props.canvas;
    this.size = props.size;
    this.row = props.row;
    this.col = props.col;
    this.type = props.type;
    this.id = props.id;

    this._setCoordinates();
  }

  _setCoordinates() {
    this.x = this.size * this.col;
    this.y = this.size * this.row;
  }

  render() {
    this.canvas.drawCell(this.x, this.y, this.type);
  }
}
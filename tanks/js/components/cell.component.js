export class Cell {
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
    
    this.upSide = this.y;
    this.rightSide = this.x + this.size;
    this.downSide = this.y + this.size;
    this.leftSide = this.x;
  }

  render() {
    this.canvas.drawCell(this.x, this.y, this.type);
  }
}


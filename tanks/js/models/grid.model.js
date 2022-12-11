export class Grid {
  constructor() {
    this.arr = [];
  }

  addCell(cell) {
    this.arr.push(cell);
  }

  getWall() {
    const wall = this.arr.filter((cell) => cell.type);
    return wall;
  }
}
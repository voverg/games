export class Grid {
  constructor() {
    this.arr = [];
    this.cellSize = 0;
  }

  addCell(cell) {
    this.arr.push(cell);
  }

  getWall() {
    const wall = this.arr.filter((cell) => cell.type);
    return wall;
  }

  getLocalTankWall({x, y}) {
    const size = this.cellSize + 5;

    const wall = this.arr.filter((cell) => {
      if (cell.type &&
          cell.x > x - size &&
          cell.x < x + 2 * size &&
          cell.y > y - size &&
          cell.y < y + 2 * size
        ) {
        return true;
      }
    });

    return wall;
  }

  getEmpty() {
    const empty = this.arr.filter((cell) => !cell.type);
    return empty;
  }
}
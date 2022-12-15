export class GridModel {
  constructor() {
    this.arr = [];
    this.cellSize = 16;
  }

  addCell(cell) {
    this.arr.push(cell);
  }

  removeCell(id) {
    this.arr = this.arr.filter((cell) => cell.id !== id);
  }

  decreaseHealth(id, count = 1) {
    const cell = this.arr.find((item) => item.id === id);
    cell.life -= count;
    
    if (cell.life <= 0) {
      this.removeCell(cell.id);
    }
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

  getLocalBulletWall({x, y}) {
    const size = this.cellSize;

    const wall = this.arr.filter((cell) => {
      if (cell.type &&
          cell.x > x - size &&
          cell.x < x + size &&
          cell.y > y - size &&
          cell.y < y + size
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
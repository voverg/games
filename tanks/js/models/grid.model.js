export class GridModel {
  constructor() {
    this.arr = [];
    this.cellSize = 16;
  }

  addCell(cell) {
    this.arr.push(cell);
  }

  getCell(id) {
    return this.arr.find((cell) => cell.id === id);
  }

  removeCell(id) {
    // this.arr = this.arr.filter((cell) => cell.id !== id);
    const cell = this.getCell(id);
    cell.type = null;
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

  getBaseWall() {
    const baseWall = this.arr.filter((cell) => {
      if (
          (cell.row === 25 && cell.col === 11) ||
          (cell.row === 25 && cell.col === 14) ||
          (cell.row === 24 && cell.col === 11) ||
          (cell.row === 24 && cell.col === 14) ||
          (cell.row === 23 && cell.col === 11) ||
          (cell.row === 23 && cell.col === 12) ||
          (cell.row === 23 && cell.col === 13) ||
          (cell.row === 23 && cell.col === 14)
         ) {
        return true;
      }
    });

    return baseWall;
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
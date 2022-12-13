export class EnemyModel {
  constructor() {
    this.arr = [];
    this.size = 32;
  }

  addEnemy(enemy) {
    this.arr.push(enemy);
  }

  getAll() {
    return this.arr;
  }

  removeEnemy(id) {
    this.arr = this.arr.filter((enemy) => enemy.id !== id);
  }

  decreaseLife(id) {
    const enemy = this.arr.find((item) => item.id === id);
    enemy.life -= 1;
    
    if (enemy.life <= 0) {
      this.removeEnemy(enemy.id);
    }
  }

  getLocalBulletEnemy({x, y}) {
    const size = 16;

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

  get length() {
    return this.arr.length;
  }
}
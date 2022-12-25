export class TankModel {
  constructor() {
    this.arr = [];
    this.size = 32;
  }

  addTank(tank) {
    this.arr.push(tank);
  }

  getAll() {
    return this.arr;
  }

  getTank(id) {
    return this.arr.find((item) => item.id === id);
  }

  stopTank(id) {
    const enemy = this.getTank(id);
    enemy.isMoving = false;
  }

  removeTank(id) {
    this.arr = this.arr.filter((tank) => tank.id !== id);
  }

  decreaseHealth(id, count = 1) {
    const tank = this.getTank(id);
    tank.health -= count;
    
    if (tank.health <= 0) {
      this.stopTank(id);
      this.removeTank(id);
    }
  }

  getLocalTanks(coords, id = '') {
    const size = 32 + 5;
    const {x, y} = coords;

    const tanks = this.arr.filter((tank) => {
      if (tank.type &&
          tank.id !== id &&
          tank.x > x - size &&
          tank.x < x + size &&
          tank.y > y - size &&
          tank.y < y + size
        ) {
        return true;
      }
    });

    return tanks;
  }

  getLocalMovingTanks(coords, id = '') {
    const size = 32 + 5;
    const {x, y} = coords;

    const tanks = this.arr.filter((tank) => {
      if (tank.type &&
          tank.isMoving &&
          tank.id !== id &&
          tank.x > x - size &&
          tank.x < x + size &&
          tank.y > y - size &&
          tank.y < y + size
        ) {
        return true;
      }
    });

    return tanks;
  }

  getLocalBulletTank({x, y}) {
    const size = 16;

    const tanks = this.arr.filter((tank) => {
      if (tank.type &&
          tank.x > x - size &&
          tank.x < x + size &&
          tank.y > y - size &&
          tank.y < y + size
        ) {
        return true;
      }
    });

    return tanks;
  }

  get length() {
    return this.arr.length;
  }
}
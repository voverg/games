export class BulletModel {
  constructor() {
    this.arr = [];
  }

  addBullet(bullet) {
    this.arr.push(bullet);
  }

  getAll() {
    return this.arr;
  }

  removeBullet(id) {
    this.arr = this.arr.filter((bullet) => bullet.id !== id);
  }

  get length() {
    return this.arr.length;
  }
}
export class BulletModel {
  constructor() {
    this.arr = [];
  }

  addBullet(bullet) {
    this.arr.push(bullet);
  }

  removeBullet(id) {
    this.arr = this.arr.filter((bullet) => bullet.id !== id);
  }

  getAll() {
    return this.arr;
  }

  getPlayerBullets() {
    return this.arr.filter((bullet) => bullet.type === 'bullet:player');
  }

  getEnemyBullets() {
    return this.arr.filter((bullet) => bullet.type === 'bullet:enemy');
  }

  get length() {
    return this.arr.length;
  }
}
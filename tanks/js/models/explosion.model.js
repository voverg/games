export class ExplosionModel {
  constructor() {
    this.arr = [];
  }

  add(explosion) {
    this.arr.push(explosion);
  }

  getAll() {
    return this.arr;
  }

  clearAll() {
    this.arr = [];
  }

  get length() {
    return this.arr.length;
  }
}
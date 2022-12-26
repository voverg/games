export class BonusModel {
  constructor() {
    this.arr = [];
  }

  add(bonus) {
    this.arr.push(bonus);
  }

  get(id) {
    return this.arr.find((bonus) => bonus.id === id);
  }

  remove(id) {
    this.arr = this.arr.filter((bonus) => bonus.id !== id);
  }

  getAll() {
    return this.arr;
  }

  get length() {
    return this.arr.length;
  }
}
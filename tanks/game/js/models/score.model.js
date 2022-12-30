export class ScoreModel {
  constructor() {
    this.arr = [];
  }

  add(score) {
    this.arr.push(score);
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
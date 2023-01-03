export class GridModel {
  constructor() {
    this.arr = [];
  }

  add(item) {
    this.arr.push(item);
  }

  get(id) {
    return this.arr.find((item) => item.id === id);
  }

  getAll() {
    return this.arr;
  }

}
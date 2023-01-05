export class GridModel {
  constructor() {
    this.arr = [];
  }

  add(item) {
    this.arr.push(item);
  }

  setCode(id, code) {
    this.arr.forEach((item) => {
      if (item.id === id) {
        item.code = code;
        item.update();
      }
    });
  }

  get(id) {
    return this.arr.find((item) => item.id === id);
  }

  select(id) {
    this.arr.forEach((item) => item.selected = item.id === id ? true : false);
  }

  getAll() {
    return this.arr;
  }

}
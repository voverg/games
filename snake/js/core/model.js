export class Model {
  constructor() {
    this.arr = [];
  }

  get length() {
    return this.arr.length;
  }

  getByIndex(index) {
    return this.arr[index];
  }

  find(fn) {
    return this.arr.find(fn);
  }

  push(elem) {
    this.arr.push(elem);
  }

  pop() {
    this.arr.pop();
  }

  unshift(elem) {
    this.arr.unshift(elem);
  }

  shift() {
    this.arr.shift();
  }

  forEach(fn) {
    this.arr.forEach(fn);
  }

  map(fn) {
    return this.arr.map(fn);
  }

  filter(fn) {
    return this.arr.filter(fn);
  }
}
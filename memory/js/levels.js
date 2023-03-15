export class Levels {
  constructor() {
    this.levels = {
      1: {
        id: 1,
        rows: 2,
        cols: 2,
        cards: [1, 2],
        timeout: 15,
      },
      2: {
        id: 2,
        rows: 2,
        cols: 3,
        cards: [1, 2, 3],
        timeout: 20,
      },
      3: {
        id: 3,
        rows: 2,
        cols: 4,
        cards: [1, 2, 3, 4],
        timeout: 25,
      },
      4: {
        id: 4,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 30,
      },
      5: {
        id: 5,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 25,
      },
      6: {
        id: 6,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 20,
      },
      7: {
        id: 7,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 15,
      },
    };
  }

  get(level) {
    return this.levels[level];
  }

  getAll() {
    return this.levels;
  }

  get length() {
    return Object.keys(this.levels).length;
  }

}
export class Levels {
  constructor() {
    this.levels = {
      1: {
        level: 1,
        rows: 2,
        cols: 2,
        cards: [1, 2],
        timeout: 15,
      },
      2: {
        level: 2,
        rows: 2,
        cols: 3,
        cards: [1, 2, 3],
        timeout: 20,
      },
      3: {
        level: 3,
        rows: 2,
        cols: 4,
        cards: [1, 2, 3, 4],
        timeout: 25,
      },
      4: {
        level: 4,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 30,
      },
      5: {
        level: 5,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 25,
      },
      6: {
        level: 6,
        rows: 2,
        cols: 5,
        cards: [1, 2, 3, 4, 5],
        timeout: 20,
      },
      7: {
        level: 7,
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

}
export class SnakeModel {
  constructor() {
    this.cells = [];
    this.snakes = [];

    this.moving = false;
    this.direction = 'up';
  }

  init(cells) {
    this.cells = cells;
    const startCells = [
      {row: 7, col: 7},
      {row: 8, col: 7}
    ];

    startCells.forEach((startCell) => {
      const cell = this.cells.get(startCell.row, startCell.col);
      this.snakes.push(cell);
    });
  }

  start(key) {
    switch (key) {
      case 'ArrowUp':
        this.direction = 'up';
        break;
      case 'ArrowDown':
        this.direction = 'down';
        break;
      case 'ArrowLeft':
        this.direction = 'left';
        break;
      case 'ArrowRight':
        this.direction = 'right';
        break;
      case 'Space':
        this.pause();
        break;
    }
    // this.moving = true;
  }

  pause() {
    this.moving = this.moving ? false : true;
  }

  move() {
    if (!this.moving) {
      return;
    }

    const snakeHead = this.snakes[0];
    const nextCell = this.cells.getNext(snakeHead, this.direction);

    if (nextCell) {
      this.snakes.unshift(nextCell);
      this.snakes.pop();
    }
  }

  forEach(callback) {
    this.snakes.forEach(callback);
  }

}
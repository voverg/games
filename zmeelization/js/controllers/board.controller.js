export class BoardController {
  constructor() {
    this.cells = null;
    this.snakes = null;
    this.food = null;
  }

  init( components, models ) {
    Object.keys(models).forEach((key) => {
      models[key].init(components, models);
    });

    Object.keys(components).forEach((key) => {
      components[key].init(components, models);
    });

    this.cells = models.cells;
    this.snakes = models.snake;
    this.food = models.food;

    this.food.create();
  }

  start(key) {
    switch (key) {
      case 'ArrowUp':
        this.snakes.direction = 'up';
        break;
      case 'ArrowDown':
        this.snakes.direction = 'down';
        break;
      case 'ArrowLeft':
        this.snakes.direction = 'left';
        break;
      case 'ArrowRight':
        this.snakes.direction = 'right';
        break;
      case 'Space':
        this.pause();
        break;
    }
  }

  pause() {
    this.moving = this.moving ? false : true;
  }

  move() {
    if (!this.moving) {
      return;
    }

    const snakeHead = this.snakes.snakes[0];
    const nextCell = this.cells.getNext(snakeHead, this.snakes.direction);

    if (nextCell) {
      this.snakes.unshift(nextCell);
      if (!nextCell.hasFood) {
        this.snakes.pop();
      } else {
        this.food.create();
      }
    }
  }

}
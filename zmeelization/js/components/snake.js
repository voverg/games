export class Snake {
  constructor() {
    this.canvas = null;
    this.sprites = null;
    this.snakes = null;
  }

  init(components, models) {
    this.canvas = components.canvas;
    this.sprites = models.sprites;
    this.snakes = models.snake;
  }

  render() {
    this.snakes.forEach((cell, index) => {
      if (index === 0) {
        this.canvas.drawImage(this.sprites.getElem('snakeHead'), cell.x, cell.y);
      } else {
        this.canvas.drawImage(this.sprites.getElem('snakeBody'), cell.x, cell.y);
      }
    });
  }
}

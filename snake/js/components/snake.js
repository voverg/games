export class Snake {
  constructor() {
    this.sprites = null;
    this.snakes = null;
  }

  init( _, models ) {
    this.sprites = models.sprites;
    this.snakes = models.snake;
  }

  render() {
    this.snakes.forEach((cell, index) => {
      if (index === 0) {
        const sprite = this.sprites.getElem('snakeHead');
        const deg = this.snakes.headAngle[this.snakes.direction];
        cell.renderRotate(sprite, deg);
        // cell.render(sprite); // cell.rotate contains render method
      } else {
        cell.render(this.sprites.getElem('snakeBody'));
      }
    });
  }
}

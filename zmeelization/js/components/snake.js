export class Snake {
  constructor() {
    this.canvas = null;
    this.sprites = null;
    this.snakes = null;
  }

  init(canvas, snakeModel, sprites) {
    this.canvas = canvas;
    this.sprites = sprites;
    this.snakes = snakeModel;
  }

  render() {
    this.snakes.forEach((cell) => {
      this.canvas.drawImage(this.sprites.getElem('snakeBody'), cell.x, cell.y);
    });
  }
}

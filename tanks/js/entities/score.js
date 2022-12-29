export class Score {
  constructor({canvas, spriteIndex, x, y}) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.spriteIndex = spriteIndex;
  }

  render() {
    this.canvas.drawScore({
      x: this.x,
      y: this.y,
      index: this.spriteIndex,
    });
  }
}
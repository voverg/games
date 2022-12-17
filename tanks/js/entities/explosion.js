export class Explosion {
  constructor({canvas, type, x, y}) {
    this.canvas = canvas;
    this.type = type;
    this.x = x;
    this.y = y;
    this.spriteMap = {
      tank: 'tankExplosion',
      bullet: 'bulletExplosion',
    };
  }

  render() {
    this.canvas.drawExplosion({
      x: this.x,
      y: this.y,
      spriteMap: this.spriteMap[this.type],
      index: 0,
    });
  }
}
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
    this.spriteSizeMap = {
      tank: 64,
      bullet: 32,
    }
  }

  render() {
    this.canvas.drawExplosion({
      x: this.x,
      y: this.y,
      size: this.spriteSizeMap[this.type],
      spriteMap: this.spriteMap[this.type],
      index: 0,
    });

    if (this.type === 'tank') {
      setTimeout(() => {
        this.canvas.drawScore({
          x: this.x,
          y: this.y - 16,
          index: 16,
        });
      }, 100);
    }
  }
}
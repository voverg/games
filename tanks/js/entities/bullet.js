export class Bullet {
  constructor({canvas, direction, x, y}) {
    this.canvas = canvas;
    this.direction = direction;
    this.id = null;
    this.step = 4;
    this.x = 0;
    this.y = 0;
    this.initCoordsMap = {
      up: {x: 12, y: - 4},
      right: {x: 28, y: 12},
      down: {x: 12, y: 28},
      left: {x: -4, y: 12},
    };

    this.init(x, y);
  }

  init(x, y) {
    const rnd = Math.floor(Math.random() * 100);
    this.x = x + this.initCoordsMap[this.direction].x;
    this.y = y + this.initCoordsMap[this.direction].y;
    this.id = `${x}:${y}:${this.direction}:${rnd}`;
  }

  render() {
    this.canvas.drawBullet({
      direction: this.direction,
      x: this.x,
      y: this.y,
    });
  }

}
export class Bullet {
  constructor({direction, x, y}) {
    this.direction = direction;
    this.id = null;
    this.step = 4;
    this.x = 0;
    this.y = 0;
    this.map = {
      up: {x: 12, y: - 4},
      right: {x: 28, y: 12},
      down: {x: 12, y: 28},
      left: {x: -4, y: 12},
    };

    this.init(x, y);
  }

  init(x, y) {
    const rnd = Math.floor(Math.random() * 100);
    this.x = x + this.map[this.direction].x;
    this.y = y + this.map[this.direction].y;
    this.id = `${x}:${y}:${this.direction}:${rnd}`;
  }

}
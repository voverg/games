export class Bullet {
  constructor({canvas, direction, spriteMap, type, power, size, step, x, y}) {
    this.canvas = canvas;
    this.direction = direction;
    this.spriteMap = spriteMap;
    this.id = null;
    this.step = step;
    this.power = power;
    this.size = size;
    this.type = type;
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
      spriteMap: this.spriteMap,
      x: this.x,
      y: this.y,
    });
  }

}
export class Bullet {
  constructor() {
    this.canvas = null;
    this.direction = 'up';
    this.step = 4;
    this.x = 0;
    this.y = 0;
    this.map = {
      up: {x: 12, y: - 4},
      right: {x: 28, y: 12},
      down: {x: 12, y: 28},
      left: {x: -4, y: 12},
    };
  }

  init(canvas, models) {
    this.canvas = canvas;
  }

  create({x, y, direction}) {
    this.direction = direction;
    this.x = x + this.map[direction].x;
    this.y = y + this.map[direction].y;
  }

  move() {
    switch (this.direction) {
      case 'up':
        this.y -= this.step;
        break;
      case 'right':
        this.x += this.step;
        break;
      case 'down':
        this.y += this.step;
        break;
      case 'left':
        this.x -= this.step;
        break;
    }
  }

  render() {
    // this.move();

    this.canvas.drawBullet({
      direction: this.direction,
      x: this.x,
      y: this.y,
    });
  }
}
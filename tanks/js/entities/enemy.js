export class Enemy {
  constructor({canvas, direction, x, y, type, size}) {
    this.canvas = canvas;
    this.direction = direction;
    this.size = size;
    this.type = type;
    this.id = null;
    this.life = 0;
    this.step = 2;
    this.x = x;
    this.y = y;
    this.lifeMap = {
      enemy: 1,
    }
    
    this.init();
  }

  init() {
    const rnd = Math.floor(Math.random() * 100);
    this.id = `${this.x}:${this.y}:${rnd}:${rnd}`;
    this.life = this.lifeMap[this.type];
  }

  render() {
    this.canvas.drawEnemy({
      direction: this.direction,
      x: this.x,
      y: this.y,
    });
  }

}
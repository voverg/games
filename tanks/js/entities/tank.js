export class Tank {
  constructor({canvas, direction, step, spriteMap, isMoving, x, y, type, size}) {
    this.canvas = canvas;
    this.direction = direction;
    this.spriteMap = spriteMap;
    this.isMoving = isMoving;
    this.size = size;
    this.type = type;
    this.id = null;
    this.step = step;
    this.x = x;
    this.y = y;
    this.health = 0;
    this.healthMap = {
      enemy: 1,
      player: 1,
    }
    
    this.init();
  }

  init() {
    const rnd = Math.floor(Math.random() * 100);
    this.id = `${this.x}:${this.y}:${rnd}:${rnd}`;
    this.health = this.healthMap[this.type];
  }

  render() {
    this.canvas.drawTank({
      direction: this.direction,
      spriteMap: this.spriteMap,
      x: this.x,
      y: this.y,
    });
  }

}
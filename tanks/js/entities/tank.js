import { Utils } from '../utils/utils.js';

export class Tank {
  constructor({canvas, x, y, type,}) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.canvas = canvas;
    this.type = type;
    this.tank = getTankMap(type);
    // this.direction = 'up';
    // this.prevDirection = this.direction;
    // this.spriteMap = '';
    // this.isMoving = false;
    // this.id = '';
    // this.step = 2;
    // this.shoot = false;
    // this.power = 1;
    // this.health = 0;
    // this.score = 0;
    
    this.init();
  }

  init() {
    this.direction = this.tank.direction;
    this.prevDirection = this.direction;
    this.step = this.tank.step;
    this.shoot = this.tank.shoot;
    this.shootInterval = this.tank.shootInterval;
    this.power = this.tank.power;
    this.health = this.tank.health;
    this.score = this.tank.score;
    this.spriteIndex = this.tank.spriteIndex;
    this.id = `${this.x}:${this.y}:${Utils.random(1, 100)}:${Utils.random(1, 100)}`;
  }

  render() {
    let index = this.type === 'enemy_4' ? this.spriteIndex + this.health : this.spriteIndex;
    index = index === 11 ? 10 : index;
    index = this.type === 'player' ? this.spriteIndex + this.health - 1 : index;

    this.canvas.drawTank({
      direction: this.direction,
      x: this.x,
      y: this.y,
      index: index,
    });
  }

}


function getTankMap(type) {
  const tankMap = {
    player: {
      direction: 'up',
      spriteIndex: 0,
      isMoving: false,
      step: 2,
      power: 1,
      shoot: false,
      shootInterval: 0,
      health: 1,
      score: 0,
    },
    enemy_1: {
      direction: 'left',
      spriteIndex: 4,
      isMoving: true,
      step: 2,
      power: 1,
      shoot: false,
      shootInterval: 2,
      health: 1,
      score: 100,
    },
    enemy_2: {
      direction: 'left',
      spriteIndex: 6,
      isMoving: true,
      step: 3,
      power: 1,
      shoot: false,
      shootInterval: 2,
      health: 1,
      score: 200,
    },
    enemy_3: {
      direction: 'left',
      spriteIndex: 8,
      isMoving: true,
      step: 2,
      power: 1,
      shoot: false,
      shootInterval: 1,
      health: 1,
      score: 300,
    },
    enemy_4: {
      direction: 'left',
      spriteIndex: 10,
      isMoving: true,
      step: 2,
      power: 1,
      shoot: false,
      shootInterval: 2,
      health: 4,
      score: 400,
    },
  };

  return tankMap[type];
}
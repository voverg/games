import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class EnemyTankController extends Controller {
  constructor() {
    super();
    this.setSoot = this.setShoot.bind(this);

    this.directions = {
      up: (coords, step) => ( {x: coords.x, y: coords.y - step} ),
      right:(coords, step) => ( {x: coords.x + step, y: coords.y} ),
      down:(coords, step) => ( {x: coords.x, y: coords.y + step} ),
      left: (coords, step) => ( {x: coords.x - step, y: coords.y} ),
    };
  }

  init(props) {
    super.init(props);

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    const bulletInterval = setInterval(() => {
      this.models.enemy.getAll().forEach((enemy) => {
        enemy.shoot = true;
      });
    }, 1000);
  }

  setShoot (enemy) {
    const bullet = new this.entities.Bullet({
      canvas: this.canvas,
      direction: enemy.direction,
      spriteMap: 'bulletMap',
      type: 'bullet:enemy',
      power: 1,
      size: this.sources.sprite.bullet_size,
      step: 4,
      x: enemy.x,
      y: enemy.y,
    });
    this.models.bullet.addBullet(bullet);
  }

  shoot() {
    this.models.enemy.getAll().forEach((enemy) => {
      if (!enemy.shoot) return;
      this.setShoot(enemy);
      enemy.shoot = false;
    });
  }

  move() {
    this.models.enemy.getAll().forEach((enemy) => {
      const newCoords = this.getNewCoords(enemy);
      enemy.x = newCoords.x;
      enemy.y = newCoords.y;
    });
  }

  getNewCoords(enemy) {
    const spriteSize = enemy.size;
    const currentCoords = {x: enemy.x, y: enemy.y};
    let newCoords = this.directions[enemy.direction](currentCoords, enemy.step);
    newCoords = this.collite(currentCoords, newCoords, spriteSize, enemy);

    return newCoords;
  }

  setSides(enemy, sides) {
    enemy.upSide = sides.upSide;
    enemy.rightSide = sides.rightSide;
    enemy.downSide = sides.downSide;
    enemy.leftSide = sides.leftSide;
  }

  collite(currentCoords, newCoords, spriteSize, enemy) {
    const sides = Utils.getSideCoords(newCoords, spriteSize);
    this.setSides(enemy, sides);
    // Wall collisions
    const wall = this.models.grid.getLocalTankWall(currentCoords);
    const wallCollisions = wall.filter((cell) => Utils.isCollision(cell, sides));
    // Player collisions
    const players = this.models.player.getLocalTanks(currentCoords);
    const playerCollisions = players.filter((player) => Utils.isCollision(player, sides));
    // Enemy collisions
    const enemies = this.models.enemy.getLocalTanks(currentCoords, enemy.id);
    const enemyCollisions = enemies.filter((enemy) => Utils.isCollision(enemy, sides));
    // Border collisions
    const borderWidth = this.canvas.width - spriteSize; // 384
    const borderHeight = this.canvas.height - spriteSize; // 416
    const borderCollision = Utils.isBorder(newCoords, borderWidth, borderHeight);
    // Collisions conditions
    const collisions = [wallCollisions.length, playerCollisions.length, enemyCollisions.length, borderCollision];
    if (Utils.hasCollisions(collisions)) {
      this.changeDirection(currentCoords, enemy);
      return currentCoords;
    }

    return newCoords;
  }

  changeDirection(coords, enemy) {
    let directions = ['up', 'right', 'down', 'left'];
    directions = directions.filter((direction) => direction !== enemy.direction);
    const randomDirection = this.newDirection(enemy.direction, directions.length - 1);
    enemy.direction = directions[randomDirection];

    return coords;
  }

  newDirection(direction, length) {
    const randomDirection = Utils.random(0, length);
    if (randomDirection === direction) {
      this.newDirection(direction);
    }

    return randomDirection;
  }

}
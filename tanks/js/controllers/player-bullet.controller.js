import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class PlayerBulletController extends Controller {
  constructor() {
    super();
    this.bullet_size = null;
  }

  init(props) {
    super.init(props);
    this.bullet_size = this.sources.sprite.bullet_size;

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  move() {
    this.models.bullet.getPlayerBullets().forEach((bullet) => {
      const coords = this.changeCoords(bullet.direction, bullet.x, bullet.y, bullet.step);
      bullet.x = coords.x;
      bullet.y = coords.y;
      // Handle collisions
      this.collite(bullet, coords);
    });
  }

  setSides(bullet, sides) {
    bullet.upSide = sides.upSide;
    bullet.rightSide = sides.rightSide;
    bullet.downSide = sides.downSide;
    bullet.leftSide = sides.leftSide;
  }

  collite(bullet, coords) {
    const sides = Utils.getSideCoords(coords, this.bullet_size);
    this.setSides(bullet, sides);
    // Wall collisions
    const wall = this.models.grid.getLocalBulletWall(coords);
    const wallCollisions = wall.filter((cell) => Utils.isCollision(cell, sides));

    if (wallCollisions.length) {
      this.destroyBullet(bullet);

      wallCollisions.forEach((cell) => {
        this.models.grid.decreaseHealth(cell.id, bullet.power);
      });
    }

    // Enemy collisions
    const enemies = this.models.enemy.getLocalTanks(coords);
    const enemyCollisions = enemies.filter((enemy) => Utils.isCollision(enemy, sides));
    if (enemyCollisions.length) {
      this.destroyBullet(bullet);

      enemies.forEach((enemy) => {
        this.models.enemy.decreaseHealth(enemy.id);
      });
    }

    // Enemy bullet collision
    const enemyBullets = this.models.bullet.getEnemyBullets();
    const bulletCollisions = enemyBullets.filter((bullet) => Utils.isCollision(bullet, sides));
    if (bulletCollisions.length) {
      this.destroyBullet(bullet);
    }

    // Border collisions
    if (Utils.isBorder(coords, this.canvas.width, this.canvas.height)) {
      this.destroyBullet(bullet);
    }
  }

  destroyBullet(bullet) {
    this.models.bullet.removeBullet(bullet.id);
    this.createExplosion({
      x: bullet.x,
      y: bullet.y,
      type: 'bullet',
      direction: bullet.direction,
    });
  }

  createExplosion({x, y, type, direction}) {
    const coordsOffset = {
      up: {x: -16, y: -8},
      right: {x: -16, y: -8},
      down: {x: -16, y: -24},
      left: {x: -8, y: -16},
    };

    const explosion = new this.entities.Explosion({
      canvas: this.canvas,
      type: type,
      x: x + coordsOffset[direction].x,
      y: y + coordsOffset[direction].y,
    });

    this.models.explosion.add(explosion);
  }

  changeCoords(direction, x, y, step) {
    switch (direction) {
      case 'up':
        y -= step;
        break;
      case 'right':
        x += step;
        break;
      case 'down':
        y += step;
        break;
      case 'left':
        x -= step;
        break;
    }

    return {x, y};
  }

}
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

  collite(bullet, coords) {
    const sides = Utils.getSideCoords(coords, this.bullet_size);
    // Wall collisions
    const wall = this.models.grid.getLocalBulletWall(coords);
    const wallCollisions = wall.filter((cell) => Utils.isCollision(cell, sides));

    if (wallCollisions.length) {
      this.models.bullet.removeBullet(bullet.id);
      wallCollisions.forEach((cell) => {
        this.models.grid.decreaseHealth(cell.id, bullet.power);
      });
    }

    // Enemy collisions
    const enemies = this.models.enemy.getLocalTanks(coords);
    const enemyCollisions = enemies.filter((enemy) => Utils.isCollision(enemy, sides));
    if (enemyCollisions.length) {
      this.models.bullet.removeBullet(bullet.id);
      enemies.forEach((enemy) => {
        this.models.enemy.decreaseHealth(enemy.id);
      });
    }
    // Border collisions
    if (Utils.isBorder(coords, this.canvas.width, this.canvas.height)) {
      this.models.bullet.removeBullet(bullet.id);
    }
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
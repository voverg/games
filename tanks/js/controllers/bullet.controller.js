import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class BulletController extends Controller {
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
    this.models.bullet.getAll().forEach((bullet) => {
      const coords = this.changeCoords(bullet.direction, bullet.x, bullet.y, bullet.step);
      bullet.x = coords.x;
      bullet.y = coords.y;
      // Check if the wall hitting
      this.collite(bullet, coords);
      // Check if the canvas border hitting
      if (this.isBorder(coords)) {
        this.models.bullet.removeBullet(bullet.id);
      }
    });
  }

  collite(bullet, coords) {
    const sides = Utils.getSideCoords(coords, this.bullet_size);
    // Wall collisions
    const wall = this.models.grid.getLocalBulletWall({x: coords.x, y: coords.y});
    const collisions = wall.filter((cell) => Utils.isCollision(cell, sides));

    if (collisions.length) {
      this.models.bullet.removeBullet(bullet.id);
      collisions.forEach((collision) => {
        this.models.grid.decreaseLife(collision.id);
      });
    }

    // Enemy collisions
    const enemies = this.models.enemy.getLocalBulletEnemy({x: coords.x, y: coords.y});
    if (enemies.length) {
      this.models.bullet.removeBullet(bullet.id);
      enemies.forEach((enemy) => {
        this.models.enemy.decreaseLife(enemy.id);
      });
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

  isBorder(coords) {
    // const borderWidth = this.canvas.width - this.bullet_size; // 384
    // const borderHeight = this.canvas.height - this.bullet_size; // 416
    const borderWidth = this.canvas.width;
    const borderHeight = this.canvas.height;

    if (coords.x <= 0 ||
        coords.x >= borderWidth ||
        coords.y <= 0 ||
        coords.y >= borderHeight
        ) {
      return true;
    }
  }

}
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
      // bullet.x = coords.x;
      // bullet.y = coords.y;

      // Check if the wall hitting
      const sides = Utils.getSideCoords(coords, this.bullet_size);
      const wall = this.models.grid.getLocalBulletWall({x: coords.x, y: coords.y});
      const collisions = wall.filter((cell) => Utils.isCollision(cell, sides));
      // console.log('collisions: ', collisions);
      if (collisions.length) {
        this.models.bullet.removeBullet(bullet.id);
        collisions.forEach((collision) => {
          if (collision.type === 'tile') return;
          this.models.grid.removeCell(collision.id);
        });
      }

      // Check if the canvas border got
      if (this.isBorder(coords)) {
        this.models.bullet.removeBullet(bullet.id);
      }

      bullet.x = coords.x;
      bullet.y = coords.y;
    });
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
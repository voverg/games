import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class EnemyBulletController extends Controller {
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
    this.models.bullet.getEnemyBullets().forEach((bullet) => {
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
    this.setSides(bullet, coords);
    // Wall collisions
    const wall = this.models.grid.getLocalBulletWall(coords);
    const wallCollisions = wall.filter((cell) => Utils.isCollision(cell, sides));

    if (wallCollisions.length) {
      this.models.bullet.removeBullet(bullet.id);
      wallCollisions.forEach((cell) => {
        this.models.grid.decreaseHealth(cell.id, bullet.power);
      });
    }

    // Player collisions
    const players = this.models.player.getLocalTanks(coords);
    const playerCollisions = players.filter((player) => Utils.isCollision(player, sides));
    if (playerCollisions.length) {
      this.models.bullet.removeBullet(bullet.id);
      players.forEach((player) => {
        this.models.player.decreaseHealth(player.id);
      });
    }

    // Player bullet collision
    const playerBullets = this.models.bullet.getPlayerBullets();
    const bulletCollisions = playerBullets.filter((bullet) => Utils.isCollision(bullet, sides));
    if (bulletCollisions.length) {
      this.models.bullet.removeBullet(bullet.id);
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
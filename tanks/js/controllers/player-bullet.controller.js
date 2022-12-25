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
      this.sources.sound.getElem('explosionWall').play();
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

      const enemy = enemyCollisions[0];
      const type = enemy.health <= 0 ? enemy.type : null;
      console.log(type);
      if (type) {
        const score = enemy.score;
        this.actions.setEnemyAmount(this.state.enemyAmount - 1);
        this.actions.setScore(this.state.score + score);
        this.createTankExplosion(bullet);
        this.sources.sound.getElem('explosionTank').play();
      } else {
        this.sources.sound.getElem('hitArmoredTank').play();
      }
      console.log(this.state.score);
    }

    // Enemy bullet collision
    const enemyBullets = this.models.bullet.getEnemyBullets();
    const bulletCollisions = enemyBullets.filter((bullet) => Utils.isCollision(bullet, sides));
    if (bulletCollisions.length) {
      this.destroyBullet(bullet);
    }

    // Border collisions
    const borderWidth = this.canvas.width - bullet.size;
    const borderHeight = this.canvas.height - bullet.size;
    if (Utils.isBorder(coords, borderWidth, borderHeight)) {
      this.sources.sound.getElem('hitBorder').play();
      this.destroyBullet(bullet);
    }
  }

  createTankExplosion(bullet) {
    const coordsOffset = {
      up: {x: -24, y: -32},
      right: {x: -16, y: -24},
      down: {x: -16, y: -32},
      left: {x: -32, y: -24},
    };
    this.createExplosion(bullet, 'tank', coordsOffset);
  }

  destroyBullet(bullet) {
    this.models.bullet.removeBullet(bullet.id);

    const coordsOffset = {
      up: {x: -16, y: -8},
      right: {x: -16, y: -8},
      down: {x: -16, y: -16},
      left: {x: -8, y: -16},
    };
    this.createExplosion(bullet, 'bullet', coordsOffset);
  }

  createExplosion(bullet, type, coordsOffset) {
    const explosion = new this.entities.Explosion({
      canvas: this.canvas,
      type: type,
      x: bullet.x + coordsOffset[bullet.direction].x,
      y: bullet.y + coordsOffset[bullet.direction].y,
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
import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class EnemyTankController extends Controller {
  constructor() {
    super();
    this.size = null;
    this.tile_size = null;
    this.step = 2;
    this.coords = {};

    this.directions = {
      up: (obj) => ( {x: obj.x, y: obj.y - this.step} ),
      right:(obj) => ( {x: obj.x + this.step, y: obj.y} ),
      down:(obj) => ( {x: obj.x, y: obj.y + this.step} ),
      left: (obj) => ( {x: obj.x - this.step, y: obj.y} ),
    };
  }

  init(props) {
    super.init(props);
    this.coords = this.store.getState().tankCoords;
    this.unit_size = this.sources.sprite.unit_size;
    this.tile_size = this.sources.sprite.tile_size;
    this.prevDirection = this.state.tankDirection;

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.changeDirection();
      // this.setShoot();
    });
  }

  setShoot() {
    const bullet = new this.entities.Bullet({
      canvas: this.canvas,
      direction: this.state.tankDirection,
      x: this.coords.x,
      y: this.coords.y,
    });
    this.models.bullet.addBullet(bullet);
  }

  // FIXME
  changeDirection() {
    this.direction = this.state.tankDirection;

    if (this.direction !== this.prevDirection) {
      const size = this.tile_size;
      const coords = {};

      const index_x = this.coords.x % size;
      const index_y = this.coords.y % size;
      let rest_x = 0;
      let rest_y = 0

      if (index_x !== 0) {
        rest_x = index_x < size / 2 ? index_x : size - index_x;
      }

      if (index_y !== 0) {
        rest_y = index_y < size / 2 ? index_y : size - index_y;
      }

      switch (this.prevDirection) {
        case 'up':
        case 'down':
          coords.x = this.coords.x;
          coords.y = this.coords.y + rest_y;
          break;
        case 'right':
        case 'left':
          coords.x = this.coords.x - rest_x;
          coords.y = this.coords.y;
          break;
      }

      this.prevDirection = this.direction;
      this.coords = coords;
      // this.actions.setTankCoords(this.coords);
    }
  }

  move() {
    this.models.enemy.getAll().forEach((enemy) => {
      // console.log(enemy);
    });
    // const newCoords = this.getNewCoords(direction);

    // this.coords = newCoords;
    // this.actions.setTankCoords(this.coords);
  }

  getNewCoords(direction) {
    const currentCoords = this.state.tankCoords;
    let newCoords = this.directions[direction](currentCoords);
    const sides = Utils.getSideCoords(newCoords, this.unit_size);
    // Check if the wall hitting
    // It uses 16 tiles of the wall tank(4 tiles) and around
    const wall = this.models.grid.getLocalTankWall(this.coords);
    const collisions = wall.filter((cell) => Utils.isCollision(cell, sides));

    if (collisions.length) {
      newCoords = currentCoords;
    }
    // Check if the canvas border got
    const borderWidth = this.canvas.width - this.unit_size; // 384
    const borderHeight = this.canvas.height - this.unit_size; // 416

    newCoords.x = Math.max(0, newCoords.x);
    newCoords.x = Math.min(newCoords.x, borderWidth);
    newCoords.y = Math.max(0, newCoords.y);
    newCoords.y = Math.min(newCoords.y, borderHeight);

    return newCoords;
  }

}
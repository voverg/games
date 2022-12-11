import { Controller } from './controller.js';

export class TankController extends Controller {
  constructor() {
    super();
    this.size = 0;
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
    this.size = this.sources.sprite.unit_size;
    this.prevDirection = this.state.tankDirection;

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.test();
    });
  }

  // FIXME
  test() {
    this.direction = this.state.tankDirection;

    if (this.direction !== this.prevDirection) {
      const size = 16;
      const index_x = this.coords.x % size;
      const index_y = this.coords.y % size;

      const coords = {};
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
      this.actions.setTankCoords(this.coords);
    }
  }

  move() {
    if (this.state.moving) {
      const direction = this.state.tankDirection;
      const newCoords = this.getNewCoords(direction);

      this.coords = newCoords;
      this.actions.setTankCoords(this.coords);
    }
  }

  getNewCoords(direction) {
    const currentCoords = this.state.tankCoords;
    let newCoords = this.directions[direction](currentCoords);
    const sides = this.getSideCoords(newCoords);
    // Check if the wall border got
    const wall = this.models.grid.getWall();
    const collision = wall.filter((cell) => {
      if (sides.upSide < cell.downSide &&
          sides.rightSide > cell.leftSide &&
          sides.downSide > cell.upSide &&
          sides.leftSide < cell.rightSide
        ) {
        return true;
      }
    });

    if (collision.length) {
      newCoords = currentCoords;
    }
    // Check if the canvas border got
    const borderWidth = 384;
    const borderHeight = 416;

    newCoords.x = Math.max(0, newCoords.x);
    newCoords.x = Math.min(newCoords.x, borderWidth);
    newCoords.y = Math.max(0, newCoords.y);
    newCoords.y = Math.min(newCoords.y, borderHeight);

    return newCoords;
  }

  getSideCoords(coords) {
    const sides = {
      upSide: coords.y,
      rightSide: coords.x + this.size,
      downSide: coords.y + this.size,
      leftSide: coords.x,
      }

    return sides;
  }

}
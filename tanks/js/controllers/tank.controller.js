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

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
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
    this.setSideCoords(newCoords);
    // Check if the wall border got
    const wall = this.models.grid.getWall();
    const collide = wall.filter((cell) => {
      if (this.upSide < cell.downSide &&
          this.rightSide > cell.leftSide &&
          this.downSide > cell.upSide &&
          this.leftSide < cell.rightSide
        ) {
        return true;
      }
    });

    if (collide.length) {
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

  setSideCoords(coords) {
    this.upSide = coords.y;
    this.rightSide = coords.x + this.size;
    this.downSide = coords.y + this.size;
    this.leftSide = coords.x;
  }

}
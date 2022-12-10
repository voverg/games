import { Controller } from './controller.js';

export class TankController extends Controller {
  constructor() {
    super();
    this.step = 1;
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

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  move(canvasBorders) {
    if (this.state.moving) {
      const direction = this.state.tankDirection;
      this.setCoords(direction, canvasBorders);
      this.actions.setTankCoords(this.coords);
    }
  }

  setCoords(direction, canvasBorders) {
    const boardWidth = canvasBorders.width;
    const boardHeight = canvasBorders.height;
    // console.log(boardHeight, boardWidth);
    let currentCoords = this.state.tankCoords;
    // console.log(currentCoords);
    // if (currentCoords.x <= 0 || currentCoords.y <= 0 || currentCoords.x >= boardWidth || currentCoords.x >= boardHeight) {
    //   this.coords = currentCoords;
    //   return;
    // }

    if (currentCoords.x <= 0) {
      currentCoords = {x: 0, y: currentCoords.y};
    } else if (currentCoords.y <= 0) {
      currentCoords = {x: currentCoords.x, y: 0};
    } else if (currentCoords.x >= boardWidth) {
      currentCoords = {x: boardWidth, y: currentCoords.y};
    } else if (currentCoords.y >= boardHeight) {
      currentCoords = {x: currentCoords.x, y: boardHeight};
    }

    this.coords = this.directions[direction](currentCoords);
  }

}
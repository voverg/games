export class TankController {
  constructor() {
    this.store = null;
    this.actions = null;
    this.step = 3;
    this.coords = {};

    this.directions = {
      up: (obj) => ( {x: obj.x, y: obj.y - this.step} ),
      down:(obj) => ( {x: obj.x, y: obj.y + this.step} ),
      left: (obj) => ( {x: obj.x - this.step, y: obj.y} ),
      right:(obj) => ( {x: obj.x + this.step, y: obj.y} ),
    };
  }

  init(store, actions) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  move(canvas) {
    if (this.state.moving) {
      const direction = this.state.tankDirection;
      this.setCoords(direction, canvas);
      this.actions.setTankCoords(this.coords);
    }
  }

  setCoords(direction, canvas) {
    const boardWidth = canvas.width - 30;
    const boardHeight = canvas.height - 30;
    console.log(boardHeight, boardWidth);
    let currentCoords = this.state.tankCoords;

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
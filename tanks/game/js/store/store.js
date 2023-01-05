export class Store {
  constructor() {
    this.initialState = {
      enemyAmount: 20,
      level: 1,
      levelMap: [],
      score: 0,
      playerArmor: 1,
      killedEnemies: {
        enemy_1: 0,
        enemy_2: 0,
        enemy_3: 0,
        enemy_4: 0,
      },
      isSound: false,
      isModal: false,
      modalContent: 'help',
      isGameOver: false,
      isWin: false,
    };
    this.state = rootReducer(this.initialState, {type: '__init__'});
    this.subscribers = [];
  }

  dispatch(action) {
    this.state = rootReducer(this.state, action);
    this.subscribers.forEach((fn) => fn());
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  getState() {
    return this.state;
  }
}

function rootReducer(state, action) {
  switch (action.type) {
    case 'general':
      state = {...state, ...action.payload};
      return state;
    default:
      return state;
  }
}


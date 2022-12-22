export class Store {
  constructor() {
    this.initialState = {
      enemyAmount: 20,
      score: 0,
      sound: false,
      showModal: false,
      modalContent: 'help',
      level: 1,
      gameOver: false,
      win: false,
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


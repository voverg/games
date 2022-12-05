export class Actions {
  constructor(store) {
    this.store = store;
  }

  setScore(value) {
    this.store.dispatch({ type: 'general', payload: {'score': value} });
  }

  setHiscore() {
    this.store.dispatch({ type: 'general', payload: {'highScore': 0} });
  }

  setMoving(value) {
    this.store.dispatch({ type: 'general', payload: {'moving': value} });
  }

  setSound(value) {
    this.store.dispatch({ type: 'general', payload: {'sound': value} });
  }

  setLevel() {
    this.store.dispatch({ type: 'general', payload: {'level': 1} });
  }

  setModal(value) {
    this.store.dispatch({ type: 'general', payload: {'showModal': value} });
  }
}
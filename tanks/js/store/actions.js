export class Actions {
  constructor(store) {
    this.store = store;
  }

  setScore(value) {
    this.store.dispatch({ type: 'general', payload: {'score': value} });
  }

  setEnemyAmount(value) {
    this.store.dispatch({ type: 'general', payload: {'enemyAmount': value} });
  }

  setSound(value) {
    this.store.dispatch({ type: 'general', payload: {'isSound': value} });
  }

  setLevel(value) {
    this.store.dispatch({ type: 'general', payload: {'level': value} });
  }

  setModal(value) {
    this.store.dispatch({ type: 'general', payload: {'isModal': value} });
  }

  setModalContent(value) {
    this.store.dispatch({ type: 'general', payload: {'modalContent': value} });
  }

  setWin(value) {
    this.store.dispatch({ type: 'general', payload: {'isWin': value} });
  }

  setGameOver(value) {
    this.store.dispatch({ type: 'general', payload: {'isGameOver': value} });
  }

}
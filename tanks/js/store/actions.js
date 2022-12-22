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
    this.store.dispatch({ type: 'general', payload: {'sound': value} });
  }

  setLevel(value) {
    this.store.dispatch({ type: 'general', payload: {'level': value} });
  }

  setModal(value) {
    this.store.dispatch({ type: 'general', payload: {'showModal': value} });
  }

  setModalContent(value) {
    this.store.dispatch({ type: 'general', payload: {'modalContent': value} });
  }

  setWin(value) {
    this.store.dispatch({ type: 'general', payload: {'win': value} });
  }

  setGameOver(value) {
    this.store.dispatch({ type: 'general', payload: {'gameOver': value} });
  }

}
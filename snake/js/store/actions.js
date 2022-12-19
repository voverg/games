export class Actions {
  constructor(store) {
    this.store = store;
  }

  setScore(value) {
    this.store.dispatch({ type: 'general', payload: {'score': value} });
  }

  setHiscore(value) {
    this.store.dispatch({ type: 'general', payload: {'highScore': value} });
  }

  setMoving(value) {
    this.store.dispatch({ type: 'general', payload: {'moving': value} });
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

  setSnakeSpeed(value) {
    this.store.dispatch({ type: 'general', payload: {'snakeSpeed': value} });
  }

  setBombSpeed(value) {
    this.store.dispatch({ type: 'general', payload: {'bombSpeed': value} });
  }
}
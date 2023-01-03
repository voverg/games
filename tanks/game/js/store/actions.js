export class Actions {
  constructor(store) {
    this.store = store;
  }

  setScore(value) {
    this.store.dispatch({ type: 'general', payload: {'score': value} });
  }

  setLevel(value) {
    this.store.dispatch({ type: 'general', payload: {'level': value} });
  }

  setPlayerArmor(value) {
    this.store.dispatch({ type: 'general', payload: {'playerArmor': value} });
  }

  setKilledEnemies(type) {
    const state = this.store.getState();
    const value = {...state.killedEnemies, [type]: state.killedEnemies[type] + 1};
    this.store.dispatch({ type: 'general', payload: {'killedEnemies': value} });
  }

  setEnemyAmount(value) {
    this.store.dispatch({ type: 'general', payload: {'enemyAmount': value} });
  }

  setSound(value) {
    this.store.dispatch({ type: 'general', payload: {'isSound': value} });
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
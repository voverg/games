export class Actions {
  constructor(store) {
    this.store = store;
  }

  setAsideTileId(value) {
    this.store.dispatch({ type: 'general', payload: {'asideTileId': value} });
  }

  setBoardTileId(value) {
    this.store.dispatch({ type: 'general', payload: {'boardTileId': value} });
  }

  setIsSave(value) {
    this.store.dispatch({ type: 'general', payload: {'isSave': value} });
  }

}
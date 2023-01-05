export class Actions {
  constructor(store) {
    this.store = store;
  }

  setAsideTileId(value) {
    this.store.dispatch({ type: 'general', payload: {asideTileId: value, clickTarget: 'aside'} });
  }

  setBoardTileId(value) {
    this.store.dispatch({ type: 'general', payload: {boardTileId: value, clickTarget: 'board'} });
  }

  setIsSave(value) {
    this.store.dispatch({ type: 'general', payload: {isSave: value, clickTarget: 'aside'} });
  }

}
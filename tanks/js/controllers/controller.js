export class Controller {
  constructor() {
    this.store = null;
    this.state = null;
    this.actions = null;
    this.models = null;
    this.sources = null;
    this.components = null;
  }

  init( {store, actions, models, sources, components} ) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.models = models;
    this.sources = sources;
    this.components = components;
  }
}
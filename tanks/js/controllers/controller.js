export class Controller {
  constructor() {
    this.store = null;
    this.state = null;
    this.actions = null;
    this.canvas = null;
    this.sources = null;
    this.models = null;
    this.components = null;
  }

  init( {store, actions, canvas, models, sources, components} ) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.canvas = canvas;
    this.models = models;
    this.sources = sources;
    this.components = components;
  }
}
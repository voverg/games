export class Controller {
  constructor() {
    this.store = null;
    this.actions = null;
    this.entities = null;
    this.models = null;
    this.components = null;
  }

  init({store, actions, entities, models, components}) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.entities = entities;
    this.models = models;
    this.components = components;

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.update();
    });
  }
}
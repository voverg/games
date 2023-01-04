// Entites
import { Tile } from './entities/tile.js';
// Models
import { GridModel } from './models/grid.model.js';
// Components
import { BoardComponent } from './components/board.component.js';
import { AsideComponent } from './components/aside.component.js';
// Controllers
import { BoardController } from './controllers/board.controller.js';
import { AsideController } from './controllers/aside.controller.js';
import { EventController } from './controllers/event.controller.js';

import { Store } from './store/store.js';
import { Actions } from './store/actions.js';

export class Constructor {
  constructor() {
    this.store = new Store();
    this.actions = new Actions(this.store);

    this.entities = {Tile};

    this.models = {
      grid: new GridModel(),
      aside: new GridModel(),
    };

    this.components = {
      board: new BoardComponent(),
      aside: new AsideComponent(),
    };

    this.controllers = {
      board: new BoardController(),
      aside: new AsideController(),
      event: new EventController(),
    };
  }

  init() {
    // Init components
    Object.keys(this.components).forEach((key) => {
      this.components[key].init({
        store: this.store,
        models: this.models,
      });
    });
    // Init controllers
    Object.keys(this.controllers).forEach((key) => {
      this.controllers[key].init({
        store: this.store,
        actions: this.actions,
        entities: this.entities,
        models: this.models,
        components: this.components,
      });
    });
  }

}
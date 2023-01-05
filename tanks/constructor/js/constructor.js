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
import { Service } from './utils/service.js';

export class Constructor {
  constructor() {
    this.store = new Store();
    this.state = this.store.getState();
    this.actions = new Actions(this.store);
    this.service = new Service({ store: this.store, actions: this.actions });

    this.entities = {Tile};

    this.models = {
      board: new GridModel(),
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
    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.update();
    });
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

  update() {
    if (this.state.isSave) {
      const levelMap = this.createLevelMap();
      this.service.set('tanks-level-map', levelMap);
    }
  }

  createLevelMap() {
    const levelMap = [];

    for (let row = 0; row < 13; row++) {
      const rowArr_1 = [];
      const rowArr_2 = [];

      for (let col = 0; col < 13; col++) {
        const id = `${row}:${col}`;
        const pos = this.models.board.get(id).pos;
        rowArr_1.push(pos[0], pos[1]);
        rowArr_2.push(pos[2], pos[3]);
      }
      
      levelMap.push(rowArr_1, rowArr_2);
    }

    return levelMap;
  }

}
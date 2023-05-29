import Phaser from 'phaser';

import { MapHandler } from '../entities/map-handler.js';
import { Player } from '../entities/player.js';
import { Stats } from '../entities/stats.js';
import { StatsPanel } from '../entities/stats-panel.js';
import { StatsPopup } from '../entities/stats-popup.js';

const LAPS = 2;
const CARS = {
  BLUE: {
    sprite: 'car_blue_1',
    position: 'player'
  },
  RED: {
    sprite: 'car_red_1',
    position: 'enemy'
  },
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init(props) {
    this.client = props ? props.client : null;
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  create() {
    this.map = new MapHandler(this);
    this.car = this.getCarConfig();
    this.player = new Player(this, this.map, this.car.player);

    if (this.client) {
      this.enemy = new Player(this, this.map, this.car.enemy);
    }

    this.stats = new Stats(this.scene, LAPS);
    this.statsPanel = new StatsPanel(this, this.stats);

    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on('lap', this.onLapComplete, this);
    this.matter.world.on('collisionactive', (event, a, b) => {
      if (b.gameObject === this.player.car && a.gameObject.frame.name === 'oil') {
        this.player.slide();
      }
    });
  }

  getCarConfig() {
    // The first player config
    let config = {player: CARS.BLUE, enemy: CARS.RED};
    // The second player config
    if (this.client && !this.client.master) {
      config = {player: CARS.RED, enemy: CARS.BLUE};
    }

    return config;
  }

  onLapComplete() {
    this.stats.onLapComplete();

    if (this.stats.complete) {
      this.statsPopup = new StatsPopup(this, this.stats);
    }
  }

  /**
   * [update description]
   * @param  {[number]} time      [Time in miliseconds from start the scene]
   * @param  {[number]} deltaTime [Time in miliseconds from last call this update method]
   * @return {[type]}           [description]
   */
  update(time, deltaTime) {
    this.stats.update(deltaTime);
    this.statsPanel.render();
    this.player.move();
  }


}
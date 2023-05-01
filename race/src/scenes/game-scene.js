import Phaser from 'phaser';

import { MapHandler } from '../utils/map-handler.js';
import { Player } from '../entities/player.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  create() {
    this.map = new MapHandler(this);
    this.player = new Player(this, this.map);

    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player.car);
  }



}
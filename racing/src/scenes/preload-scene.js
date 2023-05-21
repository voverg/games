import Phaser from 'phaser';

import { LoadingBar } from '../utils/loading-bar.js';

import tilesetPng from '../assets/tileset.png';
import objectsPng from '../assets/objects.png';
import tilemapJson from '../assets/tilemap.json';
import objectsJson from '../assets/objects.json';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    const loadingBar = new LoadingBar(this);

    this.load.spritesheet('tileset', tilesetPng, {frameWidth: 64, frameHeight: 64});
    this.load.tilemapTiledJSON('tilemap', tilemapJson);
    this.load.atlas('objects', objectsPng, objectsJson);
  }

  create() {
    this.scene.start('Start');
  }

}
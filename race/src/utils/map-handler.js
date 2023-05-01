export class MapHandler {
  constructor(scene) {
    this.scene = scene;
    this.init();
    this.create();
  }

  init() {
    this.tilemap = this.scene.make.tilemap({key: 'tilemap'});
    this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset', 64, 64, 0, 1);
  }

  create() {
    this.createLayers();
    this.createCollisions();
  }

  createLayers() {
    this.tilemap.createLayer('grass', this.tileset);
    this.tilemap.createLayer('road', this.tileset);
    this.tilemap.createLayer('sand', this.tileset);
    this.tilemap.createLayer('ground', this.tileset);
  }

  createCollisions() {
    this.tilemap.findObject('collisions', (obj) => {
      const sprite = this.scene.matter.add.sprite(obj.x, obj.y, 'objects', obj.name);
      sprite.setOrigin(0, 1);
      sprite.setStatic(true);
    });
  }

  getPlayerPosition() {
    return this.tilemap.findObject('player', (obj) => {
      return obj.name === 'player';
    });
  }

}
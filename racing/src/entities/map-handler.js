const GRASS_FRICTION = 0.3;
const ROADS_FRICTION = {
  road: 1,
  ground: 0.5,
  sand: 0.4,
};

export class MapHandler {
  constructor(scene) {
    this.scene = scene;
    this.checkpoints = [];

    this.init();
  }

  init() {
    this.tilemap = this.scene.make.tilemap({key: 'tilemap'});
    this.tileset = this.tilemap.addTilesetImage('tileset', 'tileset', 64, 64, 0, 1);
    this.create();
  }

  create() {
    this.createLayers();
    this.createCollisions();
    this.createCheckpoints();
    this.createOils();
  }

  createLayers() {
    this.tilemap.createLayer('grass', this.tileset);
    this.tilemap.createLayer('road', this.tileset);
    this.tilemap.createLayer('sand', this.tileset);
    this.tilemap.createLayer('ground', this.tileset);
  }

  createCollisions() {
    this.tilemap.findObject('collisions', (obj) => {
      // В программе Tiled все объекты начинают отсчёт с левого нижнего угла, поэтому подстраиваем координаты
      const x = obj.x + obj.width / 2;
      const y = obj.y - obj.height / 2;
      const sprite = this.scene.matter.add.sprite(x, y, 'objects', obj.name);
      // sprite.setOrigin(0, 1);
      // Делает объект статическим, то есть при столкновении не сдвигается
      sprite.setStatic(true);
    });
  }

  createCheckpoints() {
    this.tilemap.findObject('checkpoints', (obj) => {
      const rectangle = new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height);
      rectangle.index = obj.properties.find((item) => item.name === 'value').value;
      this.checkpoints.push(rectangle);
    });
  }

  createOils() {
    this.tilemap.findObject('oils', (obj) => {
      const x = obj.x + obj.width / 2;
      const y = obj.y - obj.height / 2;
      const sprite = this.scene.matter.add.sprite(x, y, 'objects', obj.name);
      sprite.setStatic(true);
      // Делает объект пересекаемым
      sprite.setSensor(true);
    });
  }

  getPlayerPosition() {
    return this.tilemap.findObject('player', (obj) => {
      return obj.name === 'player';
    });
  }

  getTileFriction(car) {
    for (let road of Object.keys(ROADS_FRICTION)) {
      const tile = this.tilemap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, road);
      if (tile) {
        return ROADS_FRICTION[road];
      }
    }

    return GRASS_FRICTION;
  }

  getCheckpoint(car) {
    const checkpoint = this.checkpoints.find((checkpoint) => checkpoint.contains(car.x, car.y));
    return checkpoint ? parseInt(checkpoint.index) : false;
  }

}
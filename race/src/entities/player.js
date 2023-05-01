export class Player {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    this.init();
  }

  init() {
    const pos = this.map.getPlayerPosition();
    this.car = this.scene.matter.add.sprite(pos.x, pos.y, 'objects', 'car_blue_1');
  }

}
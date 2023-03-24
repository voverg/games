import { MovableObject } from './movable-object.js';

export class Fire extends MovableObject {
  static generate(scene, player) {
    const props = {
      scene,
      player,
      x: player.x + player.width / 2,
      y: player.y,
      texture: 'fire',
      velocity: 700,
    };

    return new Fire(props);
  }

  isDead() {
    return this.active && (this.x < -this.width || this.x > this.scene.sys.game.config.width);
  }

}
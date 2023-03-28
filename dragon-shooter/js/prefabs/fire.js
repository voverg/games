import { MovableObject } from './movable-object.js';

export class Fire extends MovableObject {
  static generate(scene, player) {
    const props = {
      scene,
      player,
      x: player.x,
      y: player.y,
      texture: player.bullet.texture,
      velocity: player.bullet.velocity,
    };

    return new Fire(props);
  }

  isDead() {
    return this.active && (this.x < -this.width || this.x > this.scene.sys.game.config.width);
  }

}
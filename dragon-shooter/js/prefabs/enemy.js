import { MovableObject } from './movable-object.js';

export class Enemy extends MovableObject {
  static generate(scene) {
    const props = {
      scene,
      x: scene.sys.game.config.width + 150,
      y: Phaser.Math.Between(100, scene.sys.game.config.height - 100),
      texture: 'enemy',
      frame: `enemy${Phaser.Math.Between(1, 4)}`,
      velocity: -500,
    };

    return new Enemy(props);
  }

  isDead() {
    return this.active && this.x < -this.width;
  }

  reset(props) {
    super.reset(props);
    this.setFrame(`enemy${Phaser.Math.Between(1, 4)}`);
  }

}
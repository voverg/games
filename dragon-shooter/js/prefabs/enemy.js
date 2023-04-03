import { MovableObject } from './movable-object.js';
import { FireGroup } from './fire-group.js';

export class Enemy extends MovableObject {
  static generate(scene, fireGroup) {
    const props = {
      scene,
      fireGroup,
      x: scene.sys.game.config.width + 150,
      y: Phaser.Math.Between(100, scene.sys.game.config.height - 100),
      texture: 'enemy',
      frame: `enemy${Phaser.Math.Between(1, 4)}`,
      velocity: -150,
      bullet: {
        delay: 1000,
        velocity: -300,
        texture: 'bullet',
      },
      origin: {x: 0, y: 0.5},
    };

    return new Enemy(props);
  }

  init(props) {
    super.init(props);

    this.bullet = props.bullet;
    this.fireGroup = props.fireGroup || new FireGroup(props.scene);
    
    this.setOrigin(props.origin.x, props.origin.y);
    this.createTimer();
  }

  onTimerTick() {
    this.shoot();
  }

  createTimer() {
    this.timer = this.scene.time.addEvent({
      delay: this.bullet.delay,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }

  shoot() {
    this.fireGroup.createFire(this);
  }

  isDead() {
    return this.active && this.x < -this.width;
  }

  reset(props) {
    super.reset(props);
    this.setFrame(`enemy${Phaser.Math.Between(1, 4)}`);
  }

}
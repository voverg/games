import { MovableObject } from './movable-object.js';
import { Enemy } from './enemy.js';
import { FireGroup } from './fire-group.js';

export class Player extends Enemy {
  constructor(scene) {
    super({scene,
      x: 150,
      y: scene.sys.game.config.height / 2,
      texture: 'dragon',
      frame: 'dragon1',
      velocity: 300,
    });
  }

  init(props) {
    super.init(props);

    this.fireGroup = new FireGroup(this.scene);
    this.createTimer();
  }

  onTimerTick() {
    this.shoot();
  }

  createTimer() {
    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }

  shoot() {
    this.fireGroup.createFire(this);
  }

  move() {
    this.body.setVelocity(0);

    if (this.scene.cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    } else if (this.scene.cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }

    if (this.scene.cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    } else if (this.scene.cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    }
  }

}
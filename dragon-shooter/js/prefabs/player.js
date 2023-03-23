import { FireGroup } from './fire-group.js';

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'dragon', 'dragon1');
  }

  init(pos) {
    this.velocity = 300;
    this.setPosition(pos.x, pos.y);
    // Add this sprite to the scene
    this.scene.add.existing(this);
    // Turn physics on this sprite
    this.scene.physics.add.existing(this);
    this.body.enable = true;

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
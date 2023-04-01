import { Enemy } from './enemy.js';

export class Player extends Enemy {
  constructor(scene) {
    super({
      scene,
      x: 150,
      y: scene.sys.game.config.height / 2,
      texture: 'dragon',
      frame: 'dragon1',
      velocity: 300,
      bullet: {
        delay: 500,
        velocity: 700,
        texture: 'fire',
      },
      origin: {x: 1, y: 0.5},
    });

    this.fly();
  }

  fly() {
    // Generate dragon frames for animation
    const frames = this.scene.anims.generateFrameNames('dragon', {
      prefix: 'dragon',
      start: 1,
      end: 6,
    });

    // Create a new animation
    this.scene.anims.create({
      key: 'fly',
      frames,
      frameRate: 10,
      repeat: -1,
    });

    // // Start the created animation
    this.play('fly');
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
export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'enemy', 'enemy1');
    this.velocity = 50;
  }

  init(pos) {
    this.setPosition(pos.x, pos.y);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
  }

  move() {
    this.body.setVelocityX(-this.velocity);
  }

}
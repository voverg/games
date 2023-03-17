export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, {x, y, texture, frame}) {
    // super(scene, 0, 0, 'enemy', 'enemy1');
    super(scene, x, y, texture, frame);
    this.init();
  }

  static generate(scene, {width, height}) {
    const props = {
      x: width - 150,
      y: Phaser.Math.Between(100, height - 100),
      texture: 'enemy',
      frame: `enemy${Phaser.Math.Between(1, 4)}`,
    };
    return new this(scene, props);
  }

  init() {
    this.velocity = 50;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
  }

  move() {
    this.body.setVelocityX(-this.velocity);
  }

}
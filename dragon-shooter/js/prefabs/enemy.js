export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, {x, y, texture, frame}) {
    super(scene, x, y, texture, frame);
    this.init();
  }

  static generate(scene) {
    const props = {
      x: scene.sys.game.config.width + 150,
      y: Phaser.Math.Between(100, scene.sys.game.config.height - 100),
      texture: 'enemy',
      frame: `enemy${Phaser.Math.Between(1, 4)}`,
    };

    return new Enemy(scene, props);
  }

  init() {
    this.velocity = 100 * 5;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.scene.events.on('update', this.update, this);
  }

  update() {
    if (this.active && this.x < this.width) {
      this.setAlive(false);
      console.log('Enemy deactivated');
    }
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }

  reset() {
    this.x = this.scene.sys.game.config.width + 150;
    this.y = Phaser.Math.Between(100, this.scene.game.config.height - 100);
    this.setFrame(`enemy${Phaser.Math.Between(1, 4)}`);
    this.setAlive(true);
  }

  move() {
    this.body.setVelocityX(-this.velocity);
  }

}
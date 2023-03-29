export class MovableObject extends Phaser.GameObjects.Sprite {
  constructor(props) {
    super(props.scene, props.x, props.y, props.texture, props.frame);
    this.init(props);
  }

  init(props) {
    this.velocity = props.velocity;
    // Add this sprite to the scene
    this.scene.add.existing(this);
    // Turn physics on this sprite
    this.scene.physics.add.existing(this);
    this.body.enable = true;

    this.scene.events.on('update', this.update, this);
  }

  update() {
    if (this.isDead()) {
      this.setAlive(false);
    }
  }

  isDead() {
    return false;
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);

    if (this.timer) {
      this.timer.paused = !status;
    }

    if (!status) {
      this.emit('killed');
    }
  }

  reset({x, y}) {
    this.x = x;
    this.y = y;
    this.setAlive(true);
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }

}
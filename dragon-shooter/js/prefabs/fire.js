export class Fire extends Phaser.GameObjects.Sprite {
  constructor(props) {
    super(props.scene, 0, 0, 'fire');

    this.init(props);
  }

  static generate(scene, player) {
    const props = {
      scene,
      player,
      velocity: 700,
    };

    return new Fire(props);
  }

  init(props) {
    this.velocity = props.velocity;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // this.body.enable = true;
    this.reset(props.player);
    this.scene.events.on('update', this.update, this);
  }

  update() {
    if (this.active && (this.x < -this.width || this.x > this.scene.sys.game.config.width) ) {
      this.setAlive(false);
    }
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }

  reset(player) {
    this.x = player.x + player.width / 2;
    this.y = player.y;
    this.setAlive(true);
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }

}
export class Boom extends Phaser.GameObjects.Sprite {
  constructor(props) {
    super(props.scene, props.x, props.y, 'boom', 'boom1');
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.createBoomAnimation();
  }

  createBoomAnimation() {
    const frames = this.scene.anims.generateFrameNames('boom', {
      prefix: 'boom',
      start: 1,
      end: 4,
    });

    this.scene.anims.create({
      key: 'boom',
      frames,
      frameRate: 10,
      repeat: 0,
    });

    this.play('boom');

    this.once('animationcomplete', this.completeHandler);
  }

  completeHandler() {
    this.destroy();
  }

}
export class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value) {
    super(scene, 0, 0, `card`);
    this.scene = scene;
    this.value = value;
    this.opened = false;
    this.pos = {};

    // Set the starting point of sprite coords if it needs
    // this.setOrigin(0, 0);
    // Add the sprite to the scene
    this.scene.add.existing(this);
    // Set sprite as an interective game object
    this.setInteractive();
  }

  init(pos) {
    this.pos = pos;
    this.close();
    this.setPosition(-this.width, -this.height);
  }

  move({x, y, delay, callback}) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Linear',
      duration: 500,
      delay,
      x,
      y,
      onComplete: () => {
        if (callback) {
          callback();
        }
      },
    });
  }

  open() {
    this.opened = true;
    this.flip();
  }

  close() {
    if (!this.opened) return;
    
    this.opened = false;
    this.flip();
  }

  flip = () => {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: this.show,
    });
  }

  show = () => {
    const texture = this.opened ? `card${this.value}` : 'card';
    this.setTexture(texture);

    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: 'Linear',
      duration: 150,
    });
  }

}
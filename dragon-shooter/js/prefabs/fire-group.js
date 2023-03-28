import { Fire } from './fire.js';

export class FireGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  createFire(player) {
    let fire = this.getFirstDead();

    if (!fire) {
      fire = Fire.generate(this.scene, player);
      this.add(fire);
      // console.log('Fire created');
    } else {
      fire.reset({
        x: player.x + player.width / 2,
        y: player.y,
      });
      // console.log('Fire reused');
    }

    fire.move();
  }

}
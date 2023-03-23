import { Fire } from './fire.js';

export class FireGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
  }

  createFire(player) {
    let fire = this.getFirstDead();

    if (!fire) {
      fire = Fire.generate(this.scene, player);
      this.add(fire);
      console.log('Fire created');
    } else {
      fire.reset(player);
      console.log('Fire reused');
    }

    fire.move();
  }

}
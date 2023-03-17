import { Enemy } from './enemy.js';

export class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  createEnemy(props) {
    const enemy = Enemy.generate(this.scene, props);
    this.add(enemy);
    enemy.move();
  }

}
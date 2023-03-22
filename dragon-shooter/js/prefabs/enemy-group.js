import { Enemy } from './enemy.js';

export class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.countMax = 10;
    this.countCreated = 0;

    this.createTimer();
  }

  onTimerTick() {
    this.createEnemy(this.scene);

    if (this.countCreated >= this.countMax) {
      this.timer.remove();
    }
  }

  createTimer() {
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene);
      this.add(enemy);
    } else {
      enemy.reset();
    }

    enemy.move();
    ++this.countCreated;
  }

}
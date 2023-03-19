import { Enemy } from './enemy.js';

export class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.count = 10;

    this.createTimer();
  }

  onTimerTick() {
    const props = {width: this.scene.sys.game.config.width, height: this.scene.sys.game.config.height};
    this.createEnemy(this.scene, props);

    if (this.getLength() >= this.count) {
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

  createEnemy(props) {
    const enemy = Enemy.generate(this.scene, props);
    this.add(enemy);
    enemy.move();
  }

}
import { Enemy } from './enemy.js';
import { FireGroup } from './fire-group.js';

export class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.fireGroup = new FireGroup(scene);
    this.countMax = 2;
    this.countCreated = 0;
    this.countKilled = 0;

    this.createTimer();
  }

  onTimerTick() {
    this.createEnemy();

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

  onEnemyKilled() {
    ++this.countKilled;
    
    if (this.countKilled >= this.countMax) {
      this.scene.events.emit('enemies-killed');
    }

  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene, this.fireGroup);
      enemy.on('killed', this.onEnemyKilled, this);
      this.add(enemy);
    } else {
      enemy.reset({
        x: this.scene.sys.game.config.width + 150,
        y: Phaser.Math.Between(100, this.scene.game.config.height - 100),
      });
    }

    enemy.move();
    ++this.countCreated;
  }

}
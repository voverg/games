export class EnemyComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
  }

  render() {
    if (!this.models.enemy.length) return;

    const enemies = this.models.enemy.getAll();
    enemies.forEach((enemy) => {
      enemy.render();
    });
  }
}
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

    const bullets = this.models.enemy.getAll();
    bullets.forEach((enemy) => {
      enemy.render();
    });
  }
}
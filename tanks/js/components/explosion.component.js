export class ExplosionComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
  }

  render() {
    if (!this.models.explosion.length) return;

    const explosions = this.models.explosion.getAll();
    explosions.forEach((explosion) => {
      explosion.render();
    });

    setTimeout(() => {
      this.models.explosion.clearAll();
    }, 100);
  }
}
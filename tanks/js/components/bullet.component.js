export class BulletComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
  }

  render() {
    if (!this.models.bullet.length) return;

    const bullets = this.models.bullet.getAll();
    bullets.forEach((bullet) => {
      this.canvas.drawBullet({
        direction: bullet.direction,
        x: bullet.x,
        y: bullet.y,
      });
    });
  }
}
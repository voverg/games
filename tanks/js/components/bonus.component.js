export class BonusComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
  }

  render() {
    if (!this.models.bonus.length) return;

    const bonuses = this.models.bonus.getAll();
    bonuses.forEach((bonus) => {
      bonus.render();
    });
  }
}
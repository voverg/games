export class ScoreComponent {
  constructor() {
    this.canvas = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
  }

  render() {
    if (!this.models.score.length) return;

    const scores = this.models.score.getAll();
    scores.forEach((score) => {
      score.render();
    });

    setTimeout(() => {
      this.models.score.clearAll();
    }, 300);
  }
}
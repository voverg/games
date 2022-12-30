export class PlayerComponent {
  constructor() {
    this.canvas = null;
    this.models = null;
  }

  init(canvas, models) {
    this.canvas = canvas;
    this.models = models;
  }

  render() {
    if (!this.models.player.length) return;
    // this.canvas.drawPlayer();
    const players = this.models.player.getAll();
    players.forEach((player) => {
      player.render();
    });
  }
}
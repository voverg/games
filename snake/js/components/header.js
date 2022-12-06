export class Header {
  constructor() {
    this.store = null;
    this.state = null;
    this.$root = document.querySelector('.header');
  }

  init(components, models, store) {
    this.store = store;
    this.state = this.store.getState();

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.render();
    });
  }

  render() {
    const content = this.createContent();
    this.$root.innerHTML = content;
  }

  createContent() {
    const score = this.state.score;
    const highScore = this.state.highScore;

    return `
      <div class="score">
        <span class="score__title">Очки: </span>
        <span class="score__value">${score}</span>
      </div>
      <h1 class="header__title" data-type="tmp">Змейка</h1>
      <div class="high-score">
        <span class="high-score__title">Рекорд: </span>
        <span class="high-score__value">${highScore}</span>
      </div>
    `
  }
}
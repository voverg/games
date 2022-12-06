export class Controls {
  constructor() {
    this.store = null;
    this.state = null;
    this.$root = document.querySelector('.controls');
  }

  init( components, models, store ) {
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
    const playClass = this.state.moving ? 'play__game btn btn__pushed' : 'play__game btn';
    const playText = this.state.moving ? 'Пауза II' : 'Старт &#9658;';
    const soundClass = this.state.sound ? 'play__sound btn btn__pushed' : 'play__sound btn';
    const soundText = this.state.sound ? 'Музыка II' : 'Музыка &#9658;';
    const level = this.state.level;

    return `
      <div class="info">
        <div class="help" data-type="help">
          <button class="help__btn btn" data-type="help">?</button>
          <span class="help__text" data-type="help">&nbsp;Помощь</span>
        </div>
        <div class="level">
          <span class="level__title">Уровень: </span>
          <span class="level__value">${level}</span>
        </div>
      </div>

      <div class="play">
        <button class="btn new-game__btn" data-type="finish">Новая игра</button>
        <button class="${playClass}" data-type="move">${playText}</button>
        <button class="${soundClass}" data-type="sound">${soundText}</button>
      </div>

      <div class="arrows">
        <div class="arrow-up">
          <button class="btn arrow__btn up__btn" data-type="up"></button>
        </div>
        <div class="arrow-left">
          <button class="btn arrow__btn left__btn" data-type="left"></button>
        </div>
        <div class="arrow-right">
          <button class="btn arrow__btn right__btn" data-type="right"></button>
        </div>
        <div class="arrow-down">
          <button class="btn arrow__btn down__btn" data-type="down"></button>
        </div>
      </div>
    `;
  }
}
export class Modal {
  constructor() {
    this.$root = document.querySelector('.modal');
  }

  init({store, sources}) {
    this.store = store;
    this.state = store.getState();
    this.sourses = sources;

    this.store.subscribe(() => {
      this.state = this.store.getState();
      if (this.state.isModal) {
        this.$root.classList.add('modal__show');
        this.render();
      } else {
        this.$root.classList.remove('modal__show');
      }
    });
  }

  render() {
    const modal = this.createModal();
    this.$root.innerHTML = modal;
  }

  createModal() {
    const content = createContent(this.state);

    return `
      <div class="modal__header modal__center">
        <h2 class="modal__title">ТАНЧИКИ</h2>
      </div>

      ${content}

      <div class="modal__footer modal__center">
        <p class="footer__text">Created by <a href="https://github.com/voverg" class="footer__link" rel="noopener noreferrer" target="_blank">Voverg</a></p>
      </div>
    `;
  }

}

function createContent(state) {
  const tankAmount = Object.keys(state.killedEnemies).reduce((acc, key) => {
    acc += state.killedEnemies[key];
    return acc;
  }, 0);

  // const scoreInterval = setInterval(() => {
  //   console.log('cat');

  //   if (!state.isModal) {
  //     clearInterval(scoreInterval);
  //   }
  // }, 300);

  return `
    <div class="modal__content modal__center">
      <div class="modal__score modal__item">
        <span class="modal__score-title">СЧЁТ </span>
        <span class="modal__score-value value-color">${state.score}</span>
      </div>

      <div class="modal__level modal__item">
        <span class="modal__level-title">УРОВЕНЬ </span>
        <span class="modal__level-value value-color">${state.level}</span>
      </div>

      <hr class="hr">

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">0000</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">00</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-1"></span>
      </div>

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">0000</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">00</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-2"></span>
      </div>

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">0000</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">00</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-3"></span>
      </div>

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">0000</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">00</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-4"></span>
      </div>

      <hr class="hr">

      <div class="modal__result modal__item">
        <span class="modal__result-title">Всего танков </span>
        <span class="modal__result-value value-color">${tankAmount}</span>
      </div>

      <button class="modal__close value-color" data-type="close">ДАЛЬШЕ</button>

    </div>
  `;
}
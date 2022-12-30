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
        setTimeout(this.setRender.bind(this), 500);
      } else {
        this.$root.classList.remove('modal__show');
      }
    });
  }

  setRender() {
    const tankAmount = Object.keys(this.state.killedEnemies).reduce((acc, key) => {
      acc += this.state.killedEnemies[key];
      return acc;
    }, 0);

    let enemiesAmount = this.state.killedEnemies;
    const score = {
      enemy_1: 0,
      enemy_2: 0,
      enemy_3: 0,
      enemy_4: 0,
      tankAmount: 0,
    };

    if (tankAmount <= 0) {
      this.render({state: this.state, score});
      return;
    }

    const enemyNames = Object.keys(score);
    let count = 0;
    let enemyNameIndex = 0;
    let enemyAmount = 0;

    const scoreInterval = setInterval(() => {
      const enemy = enemyNames[enemyNameIndex];
      if (score[enemy] >= enemiesAmount[enemy]) {
        enemyNameIndex++;
        return;
      }

      score[enemy] += 1;
      score.tankAmount += 1;

      this.sourses.sound.play('score');
      this.render({state: this.state, score});

      count++;
      if (count >= tankAmount || tankAmount <= 0) {
        clearInterval(scoreInterval);
        return;
      }
    }, 200);
  }

  render(props) {
    const modal = this.createModal(props);
    this.$root.innerHTML = modal;
  }

  createModal(props) {
    const title = this.state.isWin ? 'ПРОЙДЕН' : 'НЕ ПРОЙДЕН';
    const content = createContent(props);

    return `
      <div class="modal__header modal__center">
        <h2 class="modal__title">УРОВЕНЬ ${title}</h2>
        <a href="../../../../index.html" class="modal__back">&#9668;МЕНЮ</a>
      </div>

      ${content}

      <div class="modal__footer modal__center">
        <p class="footer__text">Created by <a href="https://github.com/voverg" class="footer__link" rel="noopener noreferrer" target="_blank">Voverg</a></p>
      </div>
    `;
  }

}

function createContent({state, score}) {
  const btnText = state.isWin ? 'СЛЕДУЮЩИЙ УРОВЕНЬ' : 'ПРОЙТИ ЗАНОВО';

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
        <span class="modal__tank-value value-color">${toStr(score.enemy_1)}00</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">${toStr(score.enemy_1)}</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-1"></span>
      </div>

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">${toStr(score.enemy_2 * 2)}00</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">${toStr(score.enemy_2)}</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-2"></span>
      </div>

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">${toStr(score.enemy_3 * 3)}00</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">${toStr(score.enemy_3)}</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-3"></span>
      </div>

      <div class="modal__tank modal__item">
        <span class="modal__tank-value value-color">${toStr(score.enemy_4 * 4)}00</span>
        <span class="modal__tank-title">ОЧКОВ</span>
        <span class="modal__tank-amount value-color">${toStr(score.enemy_4)}</span>
        <span class="modal__tank-arrow">&#9668;</span>
        <span class="modal__tank-icon tank-4"></span>
      </div>

      <hr class="hr">

      <div class="modal__result modal__item">
        <span class="modal__result-title">Всего танков </span>
        <span class="modal__result-value value-color">${toStr(score.tankAmount)}</span>
      </div>

      <button class="modal__close" data-type="close">&#9668;${btnText}&#9658;</button>

    </div>
  `;
}

function toStr(score) {
  return score < 10 ? `0${score}` : score;
}
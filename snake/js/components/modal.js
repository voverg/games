import { Utils } from '../utils/utils.js';

export class Modal {
  constructor() {
    this.store = null;
    this.state = null;
    this.$root = document.querySelector('.modal');
  }

  init(components, models, store) {
    this.store = store;
    this.state = this.store.getState();

    this.store.subscribe(() => {
      this.state = this.store.getState();
      if (this.state.showModal) {
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
    const type = this.state.modalContent;
    const content = getModalContent(type, this.state);

    return `
      <div class="modal__overlay" data-type="close" title="Закрыть окно"></div>
      <div class="modal__content">
        <div class="modal__close" data-type="close" title="Закрыть окно">&#10060;</div>
        ${content}
      </div>
    `;
  }

}


function getModalContent(type, state) {
  const winText = state.win ? 'выиграли' : 'проиграли';
  const btnText = state.win ? 'Следующий уровень' : 'Начать заново';
  const score = state.score;
  const scoreText = Utils.numberFormat(score, ['очко', 'очка', 'очков']);

  const modalContent = {
    'help': `
      <h2 class="modal__title">Помощь</h2>
        <ul class="help-modal__list">
          <li class="help-modal__item">Кнопка [Старт] или клавиша <span class="key">Пробел</span> - начать/приостановить игру</li>
          <li class="help-modal__item">Кнопка [Музыка] или клавиша <span class="key">S</span> - включить/выключить музыку</li>
          <li class="help-modal__item">Стрелки [вверх/вниз/влево/вправо] или клавиши <span class="key">&#8593;</span> <span class="key">&#8595;</span> <span class="key">&#8592;</span> <span class="key"> &#8594;</span> - управление движением змейки</li>
          <li class="help-modal__item">Если удерживать клавиши стрелок в нажатом состоянии, то змейка ускоряется</li>
          <li class="help-modal__item">Игра состоит из разных уровней. Чтобы пройти уровень, нужно набрать 20 очков и не столкнуться с препятствиями</li>
          <li class="help-modal__item">Начиная со 2-го уровня появляются бомбочки, и с каждым новым уровнем их становится всё больше. И они ещё перемещаются по полю :)</li>
          <li class="help-modal__item">В каждой игре подсчитывается кол-во набранных очков и рекорд, который был достигнут на текущем уровне</li>
          <li class="help-modal__item">Уровень и рекорд записываются в Local Storage, так что при перезагрузке страницы ваш игровой прогресс сохранится</li>
        </ul>
    `,
    'finish': `
      <h2 class="modal__title">Конец игры</h2>
      <div class="modal__finish">
        <div class="modal__win">Вы ${winText}</div>
        <div class="modal__score">Вы набрали ${score} ${scoreText}</div>
        <button class="btn new-game__btn" data-type="finish">${btnText}</button>
      </div>
    `,
  }

  return modalContent[type];
}

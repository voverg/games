export class Aside {
  constructor() {
    this.$root = document.querySelector('.aside');
    this.enemyAmount = 0;
  }

  init({store}) {
    this.store = store;
    this.state = store.getState();

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.render();
    });

    this.render();
  }

  render() {
    const content = this.createContent();
    this.$root.innerHTML = content;
  }

  createContent() {
    const level = this.state.level;
    const score = this.state.score;
    const enemyAmount = this.state.enemyAmount;
    const tankImg = `<img src="img/enemy.png" class="aside__tanks-img" alt="">`;
    const tanks = [];
    for (let enemy = 0; enemy < enemyAmount; enemy++) {
      tanks.push(tankImg);
    }

    return `
      <div class="aside__tanks">${tanks.join('')}</div>

      <div class="info">
        <div class="level">
          <span class="level__text">УРОВЕНЬ </span>
          <span class="level__value">${level}</span>
        </div>

        <div class="score">
          <span class="score__text">ОЧКИ </span>
          <span class="score__value">${score}</span>
        </div>
      </div>

      <!-- <div class="aside__btns">
        <button class="pause__btn btn" data-type="pause">МЕНЮ</button>
      </div> -->
    `
  }
}
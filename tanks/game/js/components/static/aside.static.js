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
    const playerArmor = this.state.playerArmor;
    const enemyAmount = this.state.enemyAmount;
    const tankImg = `<img src="img/enemy.png" class="aside__tanks-img" alt="">`;
    const tanks = [];
    for (let enemy = 0; enemy < enemyAmount; enemy++) {
      tanks.push(tankImg);
    }

    return `
      <div class="aside__tanks">${tanks.join('')}</div>

      <div class="info">
        <div class="armor info__item">
          <span class="armor__text">БРОНЯ </span>
          <span class="armor__value">${playerArmor}</span>
        </div>

        <div class="level info__item">
          <span class="level__text">УРОВЕНЬ </span>
          <span class="level__value">${level}</span>
        </div>

        <div class="score info__item">
          <span class="score__text">ОЧКИ </span>
          <span class="score__value">${score}</span>
        </div>
      </div>
    `
  }
}
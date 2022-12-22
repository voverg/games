export class Aside {
  constructor() {
    this.$root = document.querySelector('.aside');
  }

  init({store}) {
    this.store = store;
    this.state = store.getState();

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
    const enemyAmount = this.state.enemyAmount;
    const tankImg = `<img src="img/enemy.png" class="aside__tanks-img" alt="">`;
    const tanks = [];
    for (let enemy = 0; enemy < enemyAmount; enemy++) {
      tanks.push(tankImg);
    }

    return `
      <div class="aside__tanks">${tanks.join('')}</div>
      <div class="aside__btns">
        <button class="pause__btn btn" data-type="pause">МЕНЮ</button>
      </div>
    `
  }
}
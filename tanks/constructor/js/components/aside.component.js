export class AsideComponent {
  constructor() {
    this.$root = document.querySelector('.aside');
    this.models = null;
  }

  init({models}) {
    this.models = models;
  }

  render() {
    const content = this.createContent();
    this.$root.innerHTML = content;
  }

  createContent() {
    const tiles = this.models.aside.getAll().map((tile) => {
      return `<div class="aside__item tile ${tile.className}" data-type="${tile.type}"></div>`;
    });

    const content = `
      <h2 class="aside__title">ПЛИТКИ</h2>

      <div class="tiles">
        ${tiles.join('')}
      </div>

      <button class="btn aside__btn">СОХРАНИТЬ</button>
    `;

    return content;
  }

}
export class BoardComponent {
  constructor() {
    this.$root = document.querySelector('.board');
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
    const content = this.models.grid.getAll().map((tile) => {
      return `<div class="board__item tile ${tile.className}"
                    id="${tile.id}"
                    data-type="${tile.type}">
              </div>`;
    });

    return content.join('');
  }

}
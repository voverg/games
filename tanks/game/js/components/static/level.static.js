export class Level {
  constructor() {
    this.$root = document.querySelector('.level-screen');
  }

  init({store}) {
    this.store = store;
    this.state = store.getState();

    this.render();
  }

  render() {
    const content = this.createContent();
    this.$root.innerHTML = content;

    setTimeout(() => {
      this.$root.classList.add('level-screen__hide');
    }, 1500);
  }

  createContent() {
    const level = this.state.level;

    return `
      <span class="level-screen__title">УРОВЕНЬ&nbsp;</span>
      <span class="level-screen__value">${level}</span>
    `;
    //  <audio src="sound/start.mp3" autoplay></audio>
  }
}
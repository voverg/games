export class Service {
  constructor() {
    this.store = null;
    this.actions = null;
  }

  init(components, models, store, actions) {
    this.store = store;
    this.actions = actions;
  }

  get(name, defaultData = null) {
    let data = localStorage.getItem(name);
    data = data ? JSON.parse(data) : defaultData;

    return data;
  }

  set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  setHighscoreToStore() {
    let highScore = this.get('snake-highscore');
    highScore = highScore ? highScore : 0;
    this.actions.setHiscore(highScore);
  }

  setLevelToStore() {
    let level = this.get('snake-level');
    level = level ? level : 1;
    this.actions.setLevel(level);
  }

}
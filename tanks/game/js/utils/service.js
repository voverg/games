export class Service {
  constructor({store, actions}) {
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

  setLevelToStore() {
    let level = this.get('tanks-level');
    level = level ? level : 1;
    this.actions.setLevel(level);
  }

  setScoreToStore() {
    let score = this.get('tanks-score');
    score = score ? score : 0;
    this.actions.setScore(score);
  }

}
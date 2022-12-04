import { Model } from '../core/model.js';

export class Sounds extends Model {
  constructor() {
    super();
    
    this.arr = [
      {
        name: 'theme',
        elem: null,
        path: 'sound/theme.mp3',
      },
      {
        name: 'food',
        elem: null,
        path: 'sound/food.mp3',
      },
      {
        name: 'gameOver',
        elem: null,
        path: 'sound/game-over.mp3',
      },
    ];

    this.isSound = false;

    this._load()
  }

  init() {}

  _load() {
    this.arr.forEach((sound) => {
      sound.elem = this.create(sound.name);
    });
  }

  create(name) {
    const sound = new Audio();
    sound.src = this.get(name).path;

    return sound;
  }

  get(name) {
    return this.arr.find((soundItem) => soundItem.name === name);
  }

  getElem(name) {
    return this.get(name).elem;
  }

  play(name) {
    const elem = this.getElem(name);
    elem.play();
  }

  pause(name) {
    const elem = this.getElem(name);
    elem.pause();
  }

  autoplay(name) {
    const elem = this.getElem(name);
    elem.setAttribute('autoplay', true);
  }

  loop(name) {
    const elem = this.getElem(name);
    elem.setAttribute('loop', true);
  }
}
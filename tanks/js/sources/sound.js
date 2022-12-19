export class Sound {
  constructor() {
    this.arr = [
      {
        name: 'shoot',
        elem: null,
        path: 'sound/shoot.mp3',
      },
      {
        name: 'explosionTank',
        elem: null,
        path: 'sound/explosion-tank.mp3',
      },
      {
        name: 'explosionWall',
        elem: null,
        path: 'sound/explosion-wall.mp3',
      },
      {
        name: 'hitBorder',
        elem: null,
        path: 'sound/hit-border.mp3',
      },
    ];

    this._init();
  }

  _init() {
    this.arr.forEach((sound) => {
      sound.elem = this.create(sound.name);
    });
  }

  create(name) {
    const sound = new Audio();
    sound.src = this.get(name).path;
    return sound;
  }

  async load() {
    return new Promise((resolve, reject) => {
      this.arr.forEach((sound) => {
        sound.elem.addEventListener('canplaythrough', () => resolve(this), {once: true});
      });
    });
  }

  get(name) {
    return this.arr.find((sound) => sound.name === name);
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
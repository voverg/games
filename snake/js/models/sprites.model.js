export class Sprites {
  constructor() {
    this.sprites = [
      {
        name: 'background',
        elem: null,
        path: 'img/sprites/background.png'
      },
      {
        name: 'cell',
        elem: null,
        path: 'img/sprites/cell.png'
      },
      {
        name: 'snakeHead',
        elem: null,
        path: 'img/sprites/snake-head.png'
      },
      {
        name: 'snakeBody',
        elem: null,
        path: 'img/sprites/snake-body.png'
      },
      {
        name: 'food',
        elem: null,
        path: 'img/sprites/food.png'
      },
      {
        name: 'bomb',
        elem: null,
        path: 'img/sprites/bomb.png'
      },
    ];
    this.length = this.sprites.length;

    this._load()
  }

  init() {}

  _load() {
    this.sprites.forEach((sprite) => {
      sprite.elem = this.create(sprite.name);
    });
  }

  create(name) {
    const sprite = new Image();
    sprite.src = this.get(name).path;

    return sprite;
  }

  get(name) {
    return this.sprites.find((spriteItem) => spriteItem.name === name);
  }

  getElem(name) {
    return this.get(name).elem;
  }

  getWidth(name) {
    return this.getElem(name).width;
  }

  getHeight(name) {
    return this.getElem(name).height;
  }

  forEach(callback) {
    this.sprites.forEach(callback);
  }
}
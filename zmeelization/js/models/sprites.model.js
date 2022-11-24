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
        name: 'snakeBody',
        elem: null,
        path: 'img/sprites/snake-body.png'
      }
    ];
    this.length = this.sprites.length;

    this._init();
  }

  _init() {
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
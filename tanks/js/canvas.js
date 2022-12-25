export class Canvas {
  constructor() {
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');

    this.store = null;
    this.sprite = null;
    this.levels = null;

    this.drawObj = this.drawObj.bind(this);
  }

  init( {store, models, sources} ) {
    this.store = store;
    this.state = store.getState();
    this.sprite = sources.sprite;
    this.levels = models.levels;

    this.canvas.width = this.levels.getMapWidth(this.state.level) * this.sprite.tile_size;
    this.canvas.height = this.levels.getMapHeight(this.state.level) * this.sprite.tile_size;

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  drawBase(index) {
    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite.baseMap[index].x,
      spriteOffsetY: this.sprite.baseMap[index].y,
      width: this.sprite.unit_size,
      height: this.sprite.unit_size,
      x: 192,
      y: this.height - this.sprite.unit_size,
    });
  }

  drawBullet({direction, x, y, spriteMap}) {
    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite[spriteMap][direction].x,
      spriteOffsetY: this.sprite[spriteMap][direction].y,
      width: this.sprite.bullet_size,
      height: this.sprite.bullet_size,
      x: x,
      y: y,
    });
  }

  drawTank({direction, x, y, index}) {
    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite.getTankSprite(index)[direction].x,
      spriteOffsetY: this.sprite.getTankSprite(index)[direction].y,
      width: this.sprite.unit_size,
      height: this.sprite.unit_size,
      x: x,
      y: y,
    });
  }

  drawCell(x, y, type) {
    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite.wallMap[type].x,
      spriteOffsetY: this.sprite.wallMap[type].y,
      width: this.sprite.tile_size,
      height: this.sprite.tile_size,
      x: x,
      y: y,
    });
  }

  drawExplosion({x, y, size, spriteMap, index}) {
    this.drawObj({
      sprite: this.sprite.getElem(),
      spriteOffsetX: this.sprite[spriteMap][index].x,
      spriteOffsetY: this.sprite[spriteMap][index].y,
      width: size,
      height: size,
      x: x,
      y: y,
    });
  }

  drawObj( {sprite, spriteOffsetX, spriteOffsetY, width, height, x, y} ) {
    this.ctx.drawImage(
      sprite,
      spriteOffsetX, spriteOffsetY, width, height,
      x, y, width, height
    );
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

}
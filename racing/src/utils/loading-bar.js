export class LoadingBar {
  constructor(scene) {
    this.scene = scene;
    this.style = {
      boxColor: 0xD3D3D3,
      barColor: 0x33C7FF,
      x: this.scene.sys.game.config.width / 2 - 450,
      y: this.scene.sys.game.config.height / 2 + 250,
      width: 900,
      height: 25,
    };

    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.setEvents();
  }

  setEvents() {
    this.scene.load.on('progress', this.showProgressBar, this);
    this.scene.load.on('complete', this.onLoadComplete, this);
  }

  onLoadComplete() {
    this.progressBar.destroy();
    this.progressBox.destroy();
  }

  showProgressBox() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(this.style.x, this.style.y, this.style.width, this.style.height);
  }

  showProgressBar(value) {
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(this.style.x, this.style.y, this.style.width * value, this.style.height);
  }

}
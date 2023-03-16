export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');

    this.sounds = {};
  }

  create() {
    this.createSounds();
    this.createBackground();
    this.createText();
    this.setEvents();
  }

  setEvents() {
    this.input.on('pointerdown', this.onScreenClick, this);
  }

  onScreenClick() {
    this.scene.start('Game');
    this.sounds.card.play();
    this.sounds.theme.stop();
  }

  createText() {
    const titleConfig = {
      font: '48px Caveat',
      fill: '#555',
    };

    const textConfig = {
      font: '36px Caveat',
      fill: '#555',
    };

    const title = 'Memory';
    const item1 = '- Задача игрока уагадть все пары одинаковых карт, нажимая на них, чтобы их \n перевернуть.';
    const item2 = '- В игре есть 7 уровней, игра в которых усложняется, по мере увеличения уровня. \n  Когда достигнут последний уровень, игра начинается сначала.';
    const item3 = '- За каждую угаданную пару карт игрок получает 100 баллов. Если игрок \n угадывает подряд 2 пары карт, то получает 250 баллов, 3 пары - 500 баллов, \n 4 пары - 1000 баллов, 5 пар - 5000 баллов.';
    const start = 'Кликни, чтобы начать игру';

    // Title text
    this.add.text(this.sys.game.config.width / 2 , 50, title, titleConfig).setOrigin(0.5);
    // Text items
    this.add.text(20, 100, item1, textConfig);
    this.add.text(20, 200, item2, textConfig);
    this.add.text(20, 300, item3, textConfig);
    // Start game text
    this.add.text(this.sys.game.config.width / 2, 500, start, titleConfig).setOrigin(0.5);
  }

  createSounds() {
    this.sounds = {
      card: this.sound.add('card'),
      theme: this.sound.add('theme'),
    };

    this.sounds.theme.play({
      volume: 0.1,
    });
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

}
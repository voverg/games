import { Card } from './card.js';

export class GameScene extends Phaser.Scene {
  constructor(sceneName, props) {
    super(sceneName);
    this.props = props;
    
    this.positions = [];
    this.cards = [];
    this.openedCard = null;
    this.openedCardCount = 0;
    this.sounds = {};
    this.timer = null;
    this.timeout = props.timeout;
    this.timeoutText = '';
  }

  preload() {
    this.load.image('bg', 'sprites/background.png');
    this.load.image('card', 'sprites/card.png');

    this.props.cards.forEach((value) => {
      this.load.image(`card${value}`, `sprites/card${value}.png`)
    });

    this.load.audio('card', 'sounds/card.mp3');
    this.load.audio('complete', 'sounds/complete.mp3');
    this.load.audio('success', 'sounds/success.mp3');
    this.load.audio('theme', 'sounds/theme.mp3');
    this.load.audio('timeout', 'sounds/timeout.mp3');
  }

  create() {
    this.createSounds();
    this.createTimer();
    this.createBackground();
    this.createText();
    this.createCards();
    this.start();
  }

  restart() {
    this.hideCards();
  }

  start() {
    this.openedCard = null;
    this.openedCardCount = 0;
    this.timeout = this.props.timeout;
    this.timer.paused = false;

    this.initCards();
    this.showCards();
  }

  initCards() {
    this.initCardPositions();
    // Mix the positions array by random way
    const shuffledPositions = Phaser.Utils.Array.Shuffle(this.positions);

    this.cards.forEach((card) => {
      const pos = shuffledPositions.pop();
      card.init(pos);
    });
  }

  showCards() {
    this.cards.forEach((card, index) => {
      const delay = index * 50;
      // Set card visible layer, greater value > higher layer
      card.depth = delay;

      card.move({
        x: card.pos.x,
        y: card.pos.y,
        delay,
        callback: false,
      });
    }); 
  }

  hideCards() {
    let count = 0;
    const onCardMoveComplete = () => {
      count++;
      if (count >= this.cards.length) {
        this.start();
      }
    };

    this.cards.forEach((card, index) => {
      const delay = index * 50;
      card.move({
        x: this.sys.game.config.width + card.width,
        y: this.sys.game.config.height + card.height,
        delay,
        callback: onCardMoveComplete,
      });
    }); 
  }

  createSounds() {
    this.sounds = {
      card: this.sound.add('card'),
      complete: this.sound.add('complete'),
      success: this.sound.add('success'),
      theme: this.sound.add('theme'),
      timeout: this.sound.add('timeout'),
    };

    // this.sounds.theme.play({
    //   volume: 0.1,
    // });
  }

  onTimerTick() {
    this.timeoutText.setText(`Время: ${this.timeout}`);

    if (this.timeout <= 0) {
      // this.sounds.timeout.play();
      this.timer.paused = true;
      this.restart();
    } else {
      --this.timeout;
    }
  }

  createTimer() {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }

  createBackground() {
    // Add image 2 possible ways
    // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    const bg = this.add.sprite(0, 0, 'bg');
    bg.setOrigin(0, 0);
  }

  createText() {
    const textConfig = {
      font: '28px Roboto',
      fill: '#555',
    };

    const titleTextConfig = {
      font: '42px Roboto',
      fill: 'tomato',
    };

    this.timeoutText = this.add.text(150, 20, 'Время: 0', textConfig);
    this.titleText = this.add.text(600, 20, 'Memory', titleTextConfig).setOrigin(0.5, 0.3);
    this.levelText = this.add.text(800, 20, `Уровень ${this.props.level}`, textConfig);
    this.scoreText = this.add.text(1000, 20, 'Очки 0', textConfig);
  }

  createCards() {
    for (let value of this.props.cards) {
      for (let i = 0; i < 2; i++) {
        this.cards.push(new Card(this, value));
      }
    }

    this.input.on('gameobjectdown', this.onCardClick, this);
  }

  onCardClick(pointer, card) {
    if (card.opened) return;

    this.sounds.card.play();

    if (this.openedCard) {
      if (this.openedCard.value === card.value) {
        this.openedCard = null;
        ++this.openedCardCount;
        
        if (this.isWin()) {
          this.sounds.complete.play();
        } else {
          this.sounds.success.play();
        }
      } else {
        this.openedCard.close();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }

    card.open();

    if (this.isWin()) {
      this.sounds.complete.play();
      this.restart();
    }
  }

  isWin() {
    return this.openedCardCount === this.props.cards.length;
  }

  initCardPositions() {
    const cardTexture = this.textures.get('card').getSourceImage();
    
    const cardSize = {
      width: cardTexture.width + 4,
      height: cardTexture.height + 4
    }

    const offset = {
      x: (this.sys.game.config.width - cardSize.width * this.props.cols) / 2 + cardSize.width / 2,
      y: (this.sys.game.config.height - cardSize.height * this.props.rows) / 2 + cardSize.height / 2,
    };

    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        this.positions.push({
          x: offset.x + col * cardSize.width,
          y: offset.y + 20 + row * cardSize.height,
        });
      }
    }
  }

}


import { Card } from './card.js';

export class GameScene extends Phaser.Scene {
  constructor(sceneName, props) {
    super(sceneName);
    this.props = props;
    
    this.cards = [];
    this.openedCard = null;
    this.openedCardCount = 0;
    this.timeout = props.timeout;
    this.timeoutText = '';
  }

  preload() {
    this.load.image('bg', 'sprites/background.png');
    this.load.image('card', 'sprites/card.png');

    this.props.cards.forEach((value) => {
      this.load.image(`card${value}`, `sprites/card${value}.png`)
    });
  }

  create() {
    this.createTimer();
    this.createBackground();
    this.createText();
    this.createCards();
    this.start();
  }

  start() {
    this.openedCard = null;
    this.openedCardCount = 0;
    this.timeout = this.props.timeout;

    this.initCards();
  }

  initCards() {
    const positions = this.getCardPositions();

    this.cards.forEach((card) => {
      const pos = positions.pop();
      card.close();
      card.setPosition(pos.x, pos.y);
    });
  }

  onTimerTick() {
    this.timeoutText.setText(`Time: ${this.timeout}`);

    if (this.timeout <= 0) {
      this.start();
    } else {
      --this.timeout;
    }
  }

  createTimer() {
    this.time.addEvent({
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
      font: '36px Roboto',
      fill: '#ffffff',
    };

    this.timeoutText = this.add.text(10, 330, '', textConfig);
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

    if (this.openedCard) {
      if (this.openedCard.value === card.value) {
        this.openedCard = null;
        ++this.openedCardCount;
      } else {
        this.openedCard.close();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }

    card.open();

    if (this.openedCardCount === this.props.cards.length) {
      this.start();
    }
  }

  getCardPositions() {
    const positions = [];
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
        positions.push({
          x: offset.x + col * cardSize.width,
          y: offset.y + row * cardSize.height,
        });
      }
    }
    // Mix the positions array by random way
    const shuffledPositions = Phaser.Utils.Array.Shuffle(positions);

    return shuffledPositions;
  }

}


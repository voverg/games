import { Controller } from './controller.js';

export class Event extends Controller {
  constructor() {
    super();

    this.events = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      Escape: 'close',
      Space: 'move',
      KeyS: 'sound',
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      move: 'move',
      sound: 'sound',
      help: 'help',
      close: 'close',
      finish: 'finish',
    };
  }

  init(props) {
    super.init(props);

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.checkEvent(event.code, 'keyup');
    });

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.checkEvent(event.code, 'keydown');
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      this.checkEvent(target.dataset.type);
    });
  }

  checkEvent(event, keyEventType = '') {
    const arrowEvents = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

    if (arrowEvents.has(event)) {
      const movingValue = keyEventType === 'keydown' ? true : false;
      this.actions.setMoving(movingValue);
    }

    if (event && event in this.events) {
      const eventType = this.events[event];
      this.handleEvent(eventType);
    }
  }

  handleEvent(eventType) {
    switch (eventType.toLowerCase()) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        this.actions.setTankDirection(eventType);
        break;
      case 'move':
        this.pauseMove();
        break;
      case 'sound':
        this.handleSound();
        break;
      case 'help':
        this.showHelpModal();
        break;
      case 'finish':
        this.startNewGame();
        break;
      case 'close':
        this.closeModal();
        break;
    }
  }

  pauseMove() {
    // this.snakes.moving = this.snakes.moving ? false : true;
    // this.actions.setMoving(this.snakes.moving);
  }

  handleSound() {
    // this.sounds.isSound = this.sounds.isSound ? false : true;
    // this.actions.setSound(this.sounds.isSound);

    // if (this.sounds.isSound) {
    //   this.sounds.loop('theme');
    //   this.sounds.play('theme');
    // } else {
    //   this.sounds.pause('theme');
    // }
  }

  showHelpModal() {
    // this.actions.setModal(true);
    // this.actions.setModalContent('help');
  }

  startNewGame() {
    // this.actions.setModal(false);
    // window.location.reload();
  }

  closeModal() {
    // this.actions.setModal(false);
  }

}
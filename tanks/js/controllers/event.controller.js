import { Controller } from './controller.js';

export class EventController extends Controller {
  constructor() {
    super();
    this.arrowEvents = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

    this.events = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      Escape: 'close',
      Space: 'shoot',
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
      if (this.arrowEvents.has(event.code)) {
        this.checkEvent({type: event.code, keyPressed: false, event});
      }
    });

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.checkEvent({type: event.code, keyPressed: true, event});
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      this.checkEvent({type: target.dataset.type, keyPressed: false, event});
    });
  }

  checkEvent(props) {
    const tank = this.models.player.arr[0];
    if (!tank) return;
    // Check if arrow key keydown or keyup
    if (this.arrowEvents.has(props.type)) {
      const movingValue = props.keyPressed ? true : false;
      tank.isMoving = movingValue;
    }
    // Check if event in this.events
    if (props.type && props.type in this.events) {
      const eventType = this.events[props.type];
      this.handleEvent({type: eventType, event});
    }

    // const playSound = tank.isMoving ? 'move' : 'motor';
    // const stopSound = !tank.isMoving ? 'move' : 'motor';
    // this.sources.sound.pause(stopSound);
    // this.sources.sound.loop(playSound);
    // this.sources.sound.play(playSound);
  }

  handleEvent(props) {
    switch (props.type.toLowerCase()) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        const tank = this.models.player.arr[0];
        if (!tank) return;
        tank.direction = props.type;
        break;
      case 'shoot':
        this.shoot(props.event);
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

  shoot(event) {
    const tank = this.models.player.arr[0];
    if (event.repeat || !tank) return;
    tank.shoot = true;
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
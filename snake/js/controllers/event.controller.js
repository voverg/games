export class Event {
  constructor() {
    this.store = null;
    this.snakes = null;
    this.sounds = null;

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

  init(components, models, store, actions) {
    this.snakes = models.snake;
    this.sounds = models.sounds;
    this.actions = actions;

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.checkEvent(event.code)
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      this.checkEvent(target.dataset.type);
    });
  }

  checkEvent(event) {
    if (event && event in this.events) {
      this.handleEvent(this.events[event]);
    }
  }

  handleEvent(event) {
    switch (event.toLowerCase()) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        this.snakes.direction = event;
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
    this.snakes.moving = this.snakes.moving ? false : true;
    this.actions.setMoving(this.snakes.moving);
  }

  handleSound() {
    this.sounds.isSound = this.sounds.isSound ? false : true;
    this.actions.setSound(this.sounds.isSound);

    if (this.sounds.isSound) {
      this.sounds.loop('theme');
      this.sounds.play('theme');
    } else {
      this.sounds.pause('theme');
    }
  }

  showHelpModal() {
    this.pauseMove();
    this.actions.setModal(true);
    this.actions.setModalContent('help');
  }

  startNewGame() {
    this.actions.setModal(false);
    window.location.reload();
  }

  closeModal() {
    this.actions.setModal(false);
  }

}
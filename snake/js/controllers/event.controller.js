export class Event {
  constructor() {
    this.store = null;
    this.snakes = null;
    this.sounds = null;

    this.$controls = document.querySelector('.controls');

    this.events = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      Space: 'move',
      KeyS: 'sound',
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      move: 'move',
      sound: 'sound',
      help: 'help',
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

    this.$controls.addEventListener('click', (event) => {
      event.preventDefault();
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
        this.showHelp();
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

  showHelp() {
    this.actions.setModal(true);
  }

}
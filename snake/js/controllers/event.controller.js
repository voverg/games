export class Event {
  constructor() {
    this.store = null;
    this.snakes = null;
    this.sounds = null;
    this.snakeSpeed = 0;
    this.arrows = new Set(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'up', 'right', 'down', 'left']);

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
    this.store = store;
    this.state = this.store.getState();
    this.actions = actions;
    this.snakeSpeed = Math.floor(600 - this.state.level * 50);

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.checkKeyPress(event.code, 'keydown');
      this.checkEventType(event.code);
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (!this.arrows.has(event.code)) return;
      this.checkKeyPress(event.code, 'keyup');
      this.checkEventType(event.code);
    });

    // Handle arrows
    document.addEventListener('mouseup', (event) => {
      const target = event.target;
      if (!this.arrows.has(target.dataset.type)) return;

      this.snakeSpeed = Math.floor(600 - this.state.level * 50);
      this.checkEventType(target.dataset.type);
    });

    document.addEventListener('mousedown', (event) => {
      const target = event.target;
      if (!this.arrows.has(target.dataset.type)) return;

      this.snakeSpeed = 50;
      this.checkEventType(target.dataset.type);
    });
    // Mouse events (excludes arrows events)
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (this.arrows.has(target.dataset.type)) return;

      this.checkEventType(target.dataset.type);
    });
  }

  checkKeyPress(keyCode, type) {
    if (this.arrows.has(keyCode) && !this.state.gameOver) {
      this.snakeSpeed = type === 'keydown' ? 50 : Math.floor(600 - this.state.level * 50);
    }
  }

  checkEventType(eventType) {
    if (eventType && eventType in this.events) {
      this.handleEvent(this.events[eventType]);
    }
  }

  handleEvent(eventType) {
    switch (eventType.toLowerCase()) {
      case 'up':
        if (this.snakes.direction === 'down') break;
        this.snakes.direction = eventType;
        this.actions.setSnakeSpeed(this.snakeSpeed);
        break;
      case 'down':
        if (this.snakes.direction === 'up') break;
        this.snakes.direction = eventType;
        this.actions.setSnakeSpeed(this.snakeSpeed);
        break;
      case 'left':
      if (this.snakes.direction === 'right') break;
        this.snakes.direction = eventType;
        this.actions.setSnakeSpeed(this.snakeSpeed);
        break;
      case 'right':
        if (this.snakes.direction === 'left') break;
        this.snakes.direction = eventType;
        this.actions.setSnakeSpeed(this.snakeSpeed);
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
    this.handleSound();
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
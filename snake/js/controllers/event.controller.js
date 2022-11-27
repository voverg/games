export class Event {
  constructor() {
    this.snakes = null;
  }

  init(components, models) {
    this.snakes = models.snake;

    window.addEventListener('keydown', (event) => {
      this.keyEvent(event.code)
    });
  }

  keyEvent(key) {
    switch (key) {
      case 'ArrowUp':
        this.snakes.direction = 'up';
        break;
      case 'ArrowDown':
        this.snakes.direction = 'down';
        break;
      case 'ArrowLeft':
        this.snakes.direction = 'left';
        break;
      case 'ArrowRight':
        this.snakes.direction = 'right';
        break;
      case 'Space':
        this.pause();
        break;
    }
  }

  pause() {
    this.snakes.moving = this.snakes.moving ? false : true;
  }

}
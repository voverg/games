const DIRECTIONS = Object.freeze({
  FORWARD: 1,
  NONE: 0,
  BACKWARD: -1,
});

const TURNS = Object.freeze({
  LEFT: -1,
  NONE: 0,
  RIGHT: 1,
});

const SPEED = 4;
const ACCELERATION = 0.5;
const SLIDE_ANGLE = 2;


export class Player {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    this._velocity = 0;

    this.checkpoint = 0;
    this.laps = 0;

    this.init();
  }

  init() {
    const pos = this.map.getPlayerPosition();
    this.car = this.scene.matter.add.sprite(pos.x, pos.y, 'objects', 'car_blue_1');
    this.car.setFixedRotation(true);
  }

  get lap() {
    return this.laps + 1;
  }

  get direction() {
    let direction = DIRECTIONS.NONE;

    if (this.scene.cursors.up.isDown || this.scene.cursors.space.isDown) {
      direction = DIRECTIONS.FORWARD;
    } else if (this.scene.cursors.down.isDown) {
      direction = DIRECTIONS.BACKWARD;
    }

    return direction;
  }

  get turn() {
    let turn = TURNS.NONE;

    if (this.scene.cursors.left.isDown) {
      turn = TURNS.LEFT;
    } else if (this.scene.cursors.right.isDown) {
      turn = TURNS.RIGHT;
    }

    return turn;
  }

  get angle() {
    return this.car.angle + this.turn * SPEED / 2;
  }

  get velocity() {
    const speed = Math.abs(this._velocity);
    const maxSpeed = this.getMaxSpeed();

    if (this.direction && speed < maxSpeed) {
      this._velocity += ACCELERATION * Math.sign(this.direction);
    } else if ((this.direction && speed > maxSpeed) || (!this.direction && speed > 0)) {
      this._velocity -= ACCELERATION * Math.sign(this._velocity);
    }

    return this._velocity;
  }

  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  getMaxSpeed() {
    return this.map.getTileFriction(this.car) * SPEED;
  }

  slide() {
    this.car.angle += SLIDE_ANGLE;
  }

  move() {
    this.car.setAngle(this.angle);
    const velocity = this.getVelocityFromAngle();
    this.car.setVelocity(velocity.x, velocity.y);
    this.getPosition();
  }

  getPosition() {
    const checkpoint = this.map.getCheckpoint(this.car);

    if (checkpoint) {
      this.onCheckpoint(checkpoint);
    }
  }

  onCheckpoint(checkpoint) {
    if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
      this.checkpoint = 1;
      ++this.laps;
      this.car.emit('lap', this.lap);
    } else if (checkpoint === this.checkpoint + 1) {
      ++this.checkpoint;
    }
  }

}
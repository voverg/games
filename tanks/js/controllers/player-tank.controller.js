import { Controller } from './controller.js';
import { Utils } from '../utils/utils.js';

export class PlayerTankController extends Controller {
  constructor() {
    super();

    this.directions = {
      up: (coords, step) => ( {x: coords.x, y: coords.y - step} ),
      right:(coords, step) => ( {x: coords.x + step, y: coords.y} ),
      down:(coords, step) => ( {x: coords.x, y: coords.y + step} ),
      left: (coords, step) => ( {x: coords.x - step, y: coords.y} ),
    };
  }

  init(props) {
    super.init(props);

    this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  }

  setShoot(player) {
    const bullet = new this.entities.Bullet({
      canvas: this.canvas,
      direction: player.direction,
      spriteMap: 'bulletMap',
      type: 'bullet:player',
      power: player.power,
      size: this.sources.sprite.bullet_size,
      step: player.bulletStep,
      x: player.x,
      y: player.y,
    });
    this.models.bullet.addBullet(bullet);
  }

  shoot() {
    this.models.player.getAll().forEach((player) => {
      if (!player.shoot) return;
      this.setShoot(player);
      const shootSound = this.sources.sound.getElem('shoot');
      shootSound.play();
      player.shoot = false;
    });
  }

  move() {
    this.models.player.getAll().forEach((player) => {
      if (!player.isMoving) return;

      let newCoords = this.getNewCoords(player);
      player.x = newCoords.x;
      player.y = newCoords.y;
      newCoords = this.changeDirection({x: player.x, y: player.y}, player);
      player.x = newCoords.x;
      player.y = newCoords.y;
    });
  }

  getNewCoords(player) {
    const spriteSize = player.size;
    const currentCoords = {x: player.x, y: player.y};
    let newCoords = this.directions[player.direction](currentCoords, player.step);
    newCoords = this.collite(currentCoords, newCoords, spriteSize, player);

    return newCoords;
  }

  setSides(player, sides) {
    player.upSide = sides.upSide;
    player.rightSide = sides.rightSide;
    player.downSide = sides.downSide;
    player.leftSide = sides.leftSide;
  }

  collite(currentCoords, newCoords, spriteSize, player) {
    const sides = Utils.getSideCoords(newCoords, spriteSize);
    this.setSides(player, sides);
    // Wall collisions
    const wall = this.models.grid.getLocalTankWall(currentCoords);
    const wallCollisions = wall.filter((cell) => Utils.isCollision(cell, sides));
    // Enemy collisions
    const enemies = this.models.enemy.getLocalMovingTanks(currentCoords, player.size + 5);
    // Base collisions
    const baseCollision = Utils.isCollision(this.models.base, sides);
    // Border collisions
    const borderWidth = this.canvas.width - spriteSize; // 384
    const borderHeight = this.canvas.height - spriteSize; // 416
    const borderCollision = Utils.isBorder(newCoords, borderWidth, borderHeight);
    // Collision conditions
    const collisions = [wallCollisions.length, enemies.length, baseCollision, borderCollision];
    if (Utils.hasCollisions(collisions)) {
      return currentCoords;
    }
    // Bonus collisions
    const bonuses = this.models.bonus.getLocalBonuses(currentCoords);
    const bonusCollisions = bonuses.filter((bonus) => Utils.isCollision(bonus, sides));
    if (bonusCollisions.length) {
      this.handleBonus(bonusCollisions[0], player);
    }

    return newCoords;
  }

  changeDirection(coords, player) {
    const direction = player.direction;
    if (player.direction === player.prevDirection) return coords;

    const size = this.sources.sprite.tile_size;
    const index_x = coords.x % size;
    const index_y = coords.y % size;
    let rest_x = 0;
    let rest_y = 0

    if (index_x !== 0) {
      rest_x = index_x < size / 2 ? index_x : size - index_x;
    }

    if (index_y !== 0) {
      rest_y = index_y < size / 2 ? index_y : size - index_y;
    }

    switch (player.prevDirection) {
      case 'up':
      case 'down':
        coords.x = coords.x;
        coords.y = coords.y + rest_y;
        break;
      case 'right':
      case 'left':
        coords.x = coords.x - rest_x;
        coords.y = coords.y;
        break;
    }

    player.prevDirection = player.direction;
    return coords;
  }

  handleBonus(bonus, player) {
    this.models.bonus.clearAll();
    this.actions.setScore(this.state.score + 500);
    this.sources.sound.play('winBonus');

    switch (bonus.type) {
      case 'helmet':
        player.health = 4;
        break;
      case 'timer':
        this.models.enemy.getAll().forEach((enemy) => {
          this.models.enemy.stopTank(enemy.id);
        });
        setTimeout(() => {
          this.models.enemy.getAll().forEach((enemy) => {
            this.models.enemy.moveTank(enemy.id);
          });
        }, 10000);
        break;
      case 'shovel':
        const baseWall = this.models.grid.getBaseWall();
        baseWall.forEach((cell) => {
          cell.type = 'tile';
          cell.life = cell.lifeMap[cell.type];
        });
        setTimeout(() => {
          baseWall.forEach((cell) => {
            cell.type = 'brick';
          cell.life = cell.lifeMap[cell.type];
          });
        }, 20000);
        break;
      case 'star':
        player.step += 2;
        player.bulletStep += 4;
        break;
      case 'grenade':
        this.models.enemy.getAll().forEach((enemy) => {
          const explosion = new this.entities.Explosion({
            canvas: this.canvas,
            type: 'tank',
            x: enemy.x - 15,
            y: enemy.y - 15,
          });
          this.models.explosion.add(explosion);
          this.sources.sound.play('explosionTank');
          this.models.enemy.removeTank(enemy.id);
        });
        break;
      case 'tank':
        player.power = 1000;
        break;
    }
  }

}
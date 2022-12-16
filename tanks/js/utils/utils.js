export class Utils {
  static getSideCoords(coords, size) {
    const sides = {
      upSide: coords.y,
      rightSide: coords.x + size,
      downSide: coords.y + size,
      leftSide: coords.x,
      }

    return sides;
  }

  static isCollision(cell, sides) {
    if (sides.upSide < cell.downSide &&
          sides.rightSide > cell.leftSide &&
          sides.downSide > cell.upSide &&
          sides.leftSide < cell.rightSide
        ) {
      return true;
    }
  }

  static isBorder(coords, width, height) {
    if (coords.x < 0 ||
        coords.x > width ||
        coords.y < 0 ||
        coords.y > height
      ) {
      return true;
    }
  }

  static hasCollisions(collisions) {
    for (let collision of collisions) {
      if (collision) {
        return true;
      }
    }
  }

  static random(min = 0, max = 1) {
    const result = Math.floor(Math.random() * (max + 1 - min)) + min;

    return result;
  }


}
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
    } else {
      return false;
    }
  }
}
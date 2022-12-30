export class BonusModel {
  constructor() {
    this.arr = [];
  }

  add(bonus) {
    this.arr.push(bonus);
  }

  get(id) {
    return this.arr.find((bonus) => bonus.id === id);
  }

  remove(id) {
    this.arr = this.arr.filter((bonus) => bonus.id !== id);
  }

  getAll() {
    return this.arr;
  }

  clearAll() {
    this.arr = [];
  }

  get length() {
    return this.arr.length;
  }

  getLocalBonuses(coords) {
    const size = 32 + 5;
    const {x, y} = coords;

    const bonuses = this.arr.filter((bonus) => {
      if (bonus.type &&
          bonus.x > x - size &&
          bonus.x < x + size &&
          bonus.y > y - size &&
          bonus.y < y + size
        ) {
        return true;
      }
    });

    return bonuses;
  }

}
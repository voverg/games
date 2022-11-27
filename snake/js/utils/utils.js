export class Utils {
  static random(min = 0, max = 1) {
    const result = Math.floor(Math.random() * (max + 1 - min)) + min;

    return result;
  }
}
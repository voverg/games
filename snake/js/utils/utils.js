export class Utils {
  static random(min = 0, max = 1) {
    const result = Math.floor(Math.random() * (max + 1 - min)) + min;

    return result;
  }

  static numberFormat(num, arr) {
    if (num % 10 === 1 && num % 10 !== 11) {
      return arr[0];
    }

    if ( num < 10 || num > 20 ) {
      switch (num % 10) {
        case 2:
        case 3:
        case 4:
          return arr[1];
      }
    }

    return arr[2];
  }
}
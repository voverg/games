export class Tile {
  constructor({type, code, row, col}) {
    this.type = type;
    this.code = code;
    this.row = row;
    this.col = col;
    this.id = `${row}:${col}`;
    this.pos = [];
    this.selected = false;

    this.update();
  }

  update() {
    this.className = `${this.type}-${this.code}`;
    this.pos = getPos(this.code);
  }
}

function getPos(code) {
  const positions = {
    a: [0, 0, 0, 0],
    base: [0, 0, 0, 0],
    player: [0, 0, 0, 0],
    enemy: [0, 0, 0, 0],
    b: [1, 1, 1, 1],
    c: [0, 1, 0, 1],
    d: [0, 0, 1, 1],
    e: [1, 0, 1, 0],
    f: [1, 1, 0, 0],
    g: [2, 2, 2, 2],
    h: [0, 2, 0, 2],
    i: [0, 0, 2, 2],
    j: [2, 0, 2, 0],
    k: [2, 2, 0, 0],
    l: [3, 3, 3, 3],
    m: [4, 4, 4, 4],
    n: [0, 0, 0, 1], // Эти два блока дежурные
    o: [0, 0, 1, 0],
  };

  return positions[code];
}
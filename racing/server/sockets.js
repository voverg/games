import { Server } from 'socket.io';

export class Sockets {
  constructor(server) {
    this.io = new Server(server);
    this.sessions = [];

    this.init();
  }

  init() {
    this.io.on('connection', (socket) => {
      this.onConnection(socket);
    });
  }

  getSession() {
    return this.sessions.find((session) => session.player && !session.enemy);
  }

  createSession(socket) {
    const session = {player: socket, enemy: null};
    this.sessions.push(session);
  }

  startGame(session) {
    session.player.emit('gameStart');
    session.enemy.emit('gameStart');
  }

  onConnection(socket) {
    const session = this.getSession();

    if (!session) {
      this.createSession(socket);
    } else {
      session.enemy = socket;
      this.startGame(session);
    }
    console.log(`New user server connected ${socket.id}`);
  }



}
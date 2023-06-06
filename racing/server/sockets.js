import { Server } from 'socket.io';

export class Sockets {
  constructor(server) {
    this.io = new Server(server);
    this.sessions = [];

    this.init();
  }

  init() {
    this.io.on('connection', (socket) => {
      socket.on('playerMove', (data) => {
        this.onPlayerMove(socket, data);
      });
      this.onConnection(socket);
    });
  }

  onPlayerMove(socket, data) {
    const session = this.sessions.find((session) => session.player === socket || session.enemy === socket);

    if (session) {
      const opponentSocket = socket === session.player ? session.enemy : session.player;
      opponentSocket.emit('enemyMove', data);
    }
  }

  getSession() {
    return this.sessions.find((session) => session.player && !session.enemy);
  }

  createSession(socket) {
    const session = {player: socket, enemy: null};
    this.sessions.push(session);
  }

  startGame(session) {
    session.player.emit('gameStart', {master: true});
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
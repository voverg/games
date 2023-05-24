import Phaser from 'phaser';
import { io } from 'socket.io-client';

export class Client extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    this.host = 'http://localhost:3000';
  }

  init() {
    const socket = io(this.host);

    socket.on('connect', () => {
      console.log('New client connected');
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('gameStart', () => {
      this.emit('game');
    });
  }

}
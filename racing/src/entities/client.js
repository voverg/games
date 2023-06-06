import Phaser from 'phaser';
import { io } from 'socket.io-client';

export class Client extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    this.host = 'http://localhost:3000';
    this.master = false;
    this.sent = {};
  }

  init() {
    this.socket = io(this.host);

    this.socket.on('connect', () => {
      console.log('New client connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    this.socket.on('gameStart', (props) => {
      if (props && props.master) {
        this.master = props.master;
      }
      
      this.emit('game');
    });

    this.socket.on('enemyMove', (data) => {
      this.emit('newData', data);
    });
  }

  send(props) {
    if (JSON.stringify(props) !== JSON.stringify(this.sent)) {
      this.sent = props;
      this.socket.emit('playerMove', props);
    }
  }

}
'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/db');
const clientID = 'bobTheTester';

socket.emit('subscribe', { id: clientID, event: 'testEvent' });

socket.on('testEvent', payload => {
  socket.emit('received', true);
  console.log('TE', payload);
});
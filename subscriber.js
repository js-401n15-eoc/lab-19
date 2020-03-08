'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/db');
const clientID = 'bobTheTester';

socket.emit('subscribe', { id: clientID, event: 'testEvent' });
socket.emit('getMissed', { clientID: clientID, event: 'testEvent' });
socket.emit('getMissedStuff', {
  clientID: clientID,
  event: 'package-delivered',
});

socket.on('testEvent', obj => {
  const { messageID, payload } = obj;
  let message = { event: 'testEvent', clientID, messageID };
  socket.emit('received', message);
  console.log('TE', payload);
});

socket.on('package-delivery', obj => {
  const { messageID, payload } = obj;
  let message = { event: 'package-delivered', clientID, messageID };
  socket.emit('package-delivered', message);
  console.log('TE', payload);
});

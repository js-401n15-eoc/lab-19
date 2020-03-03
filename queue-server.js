'use strict';

require('dotenv').config();
const io = require('socket.io')(process.env.PORT || 3000);
const uuid = require('uuid').v4();

let messages = {};
io.of('db', socket => {
  console.log('welcome to the db channel', socket.id);
  
  socket.on('subscribe', payload => {
    const {event, id} = payload;
    if (!messages[event]) { messages[event] = {}; }
    if (!messages[event][id]) { messages[event][id] = {}; }

    console.log(event);
    console.log(id);
  });

  socket.on('testEvent', payload => {
    let event = 'testEvent';
    for (let subscriber in messages['testEvent']) {
      messages[event][subscriber][messageID] = payload;
    }
    io.of('db').emit('testEvent', payload);
  });

  socket.on('received', payload => {
    console.log('ack', payload);
  })
});
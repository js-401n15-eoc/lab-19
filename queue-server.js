'use strict';

require('dotenv').config();
const io = require('socket.io')(process.env.PORT || 3000);
const uuid = require('uuid').v4;

let messages = {};
io.of('db', socket => {
  console.log('welcome to the db channel', socket.id);

  socket.on('subscribe', payload => {
    const { event, id } = payload;
    if (!messages[event]) {
      messages[event] = {};
    }
    if (!messages[event][id]) {
      messages[event][id] = {};
    }

    console.log(event);
    console.log(id);
  });

  socket.on('testEvent', payload => {
    let event = 'testEvent';
    let messageID = uuid();

    for (let subscriber in messages['testEvent']) {
      messages[event][subscriber][messageID] = payload;
    }

    console.log(messages);

    let msgObj = { messageID, payload };

    io.of('db').emit('testEvent', msgObj);
  });

  socket.on('package-delivery', payload => {
    let event = 'package-delivery';
    let messageID = uuid();

    for (let subscriber in messages['package-delivery']) {
      messages[event][subscriber][messageID] = payload;
    }

    console.log(messages);

    let msgObj = { messageID, payload };

    io.of('db').emit('package-delivery', msgObj);
  });

  socket.on('getMissed', payload => {
    let { clientID, event } = payload;
    // console.log('payload in getMissed', payload, messages);

    for (const messageID in messages[event][clientID]) {
      let payload = messages[event][clientID][messageID];
      io.of('db')
        .to(socket.id)
        .emit(event, { messageID, payload });
      console.log('resend', messageID);
    }
  });

  socket.on('getMissedStuff', payload => {
    let { clientID, event } = payload;

    for (const messageID in messages[event][clientID]) {
      let payload = messages[event][clientID][messageID];
      io.of('db')
        .to(socket.id)
        .emit(event, { messageID, payload });
      console.log('resend', messageID);
    }
  });

  socket.on('received', payload => {
    const { messageID, clientID, event } = payload;
    delete messages[event][clientID][messageID];
    console.log('after', messages);
  });

  socket.on('package-delivered', payload => {
    const { messageID, clientID, event } = payload;
    delete messages[event][clientID][messageID];
    console.log('after', messages);
  });
});

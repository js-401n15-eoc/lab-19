'use strict';

require('dotenv').config();
const io = require('socket.io')(process.env.PORT || 3000);

io.of('db', socket => {
  console.log('welcome to the db channel', socket.id);
});
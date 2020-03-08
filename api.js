'use strict';

const io = require('socket.io-client');
const express = require('express');
const app = express();

const socket = io.connect('http://localhost:3000/db');

app.get('/', (req, res) => {
  socket.emit('testEvent', 'Hello World');
  res.send('ok');
});

app.listen(8080, () => console.log('api is running on 8080'));

'use strict';

const io = require('socket.io-client');
const express = require('express');
const app = express();

const socket = io.connect('http://localhost:3000/db');

app.post('/delivery/:retailer/:code', (req, res) => {
  let delivery = {
    retailer: req.params.retailer,
    code: req.params.code,
  };

  socket.emit('package-delivery', delivery);
  res.send('ok');
});

app.listen(8080, () => console.log('api is running on 8080'));

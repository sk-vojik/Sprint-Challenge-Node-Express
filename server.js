const express = require('express');
const morgan = require('morgan');



const server = express();

server.use(express.json());
server.use(morgan('dev'));


server.get('/', (req, res) => {
  res.send('Hello from server')
});

module.exports = server;
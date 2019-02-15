const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./projects/projects-router');


const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/projects', projectRouter);


server.get('/', (req, res) => {
  res.send('Hello from server')
});

module.exports = server;
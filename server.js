const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./projects/projects-router');
const actionRouter = require('./data/actions/actions-router');

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
  res.send('Hello from server')
});

module.exports = server;
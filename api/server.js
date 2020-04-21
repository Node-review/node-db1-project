const express = require("express");
const accountRouters = require('../data/accountsRouter.js');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

server.use('/api/accounts', accountRouters);

server.get('/', (req, res) => {
  res.send({ API: `It's working` })
});

module.exports = server;

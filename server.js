const express = require('express');
const smurfs = require('./smurfs/routes.js');

const server = express();

server.use(express.json());

server.use('/api/smurfs', smurfs);

module.exports = server;

const express = require('express');

const server = express();

server.use(express.json());

server.listen(4000, () =>  console.log('server running on port 4000'));

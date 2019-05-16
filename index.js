require('dotenv').config();
const server = require('./server.js');

server.listen(4000, () =>  console.log('server running on port 4000'));

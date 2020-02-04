const { main: startClient } = require('./httpClient');

const PORT = 3030;

const options = {
  hostname: 'http://localhost',
  port: PORT,
  method: 'GET',
};

startClient(options);

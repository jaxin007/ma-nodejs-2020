const { main: startClient } = require('./httpClient');
const { startServer } = require('./server');

const PORT = 30030;

const options = {
  pathname: `http://localhost`,
  port: PORT,
  method: 'GET',
};

startServer(PORT);
startClient(options);

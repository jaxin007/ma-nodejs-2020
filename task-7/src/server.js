const http = require('http');
const url = require('url');
const { metricsController, limitController, defaultController } = require('./controllers');

const limit = 300;
const username = 'jaxin007';
const password = 'dimonbil';
const authData = `Basic Authorization${Buffer.from(`${username}:${password}`).toString('base64')}`;

function startServer(PORT) {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    http.get('http://user:password@127.0.0.1:3030/metrics', {
      host: `127.0.0.1${PORT}`,
      auth: authData,
    });

    const baseUrl = url.parse(req.url).pathname;

    if (!authData) {
      defaultController(req, res);
    }

    switch (baseUrl) {
      case '/limit':
        limitController(req, res, limit);
        break;

      case '/metrics':
        metricsController(req, res);
        break;

      default:
        defaultController(req, res);
        break;
    }
  });

  server.listen(PORT);
}

module.exports = {
  startServer,
};

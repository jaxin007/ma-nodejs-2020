const http = require('http');
const url = require('url');
const { metricsController, limitController, defaultController } = require('./controllers');

const limit = 300;
const username = 'jaxin007';
const password = 'dimonbil';
const authData = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

function startServer(PORT) {
  const server = http.createServer((req, res) => {
    if (req.headers.authorization !== `${authData}`) {
      res.statusCode = 401;
      res.end(http.STATUS_CODES[401]);
    } else {
      res.setHeader('Content-Type', 'application/json');

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
    }
  });

  server.listen(PORT);
}

module.exports = {
  startServer,
};

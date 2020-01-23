const http = require('http');
const url = require('url');
const { metricsController, limitController, defaultController } = require('./controllers');

const PORT = 8080;

const limit = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const baseUrl = url.parse(req.url).pathname;

  switch (baseUrl) {
    case '/limit':
      limitController(req, res, limit);
      break;

    case '/metrics':
      metricsController(req, res);
      break;

    default:
      defaultController(req, res);
  }
});

server.listen(PORT);
console.log(`Server started on ${PORT} port`);

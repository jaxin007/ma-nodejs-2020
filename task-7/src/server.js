const http = require('http');
const { memoryMonitor } = require('./memoryMonitor');

const port = 8000;
http
  .createServer(function(req, res) {
    const { method, url, baseUrl } = req;
    res.writeHead(200, { 'Content-Type': 'application/json' });

    switch (url) {
      case '/':
        res.write('Server started');
        res.end();
        break;
      case '/user':
        if (method === 'GET' && baseUrl === '/limit') res.write(JSON.stringify(memoryMonitor));
        res.end();
        break;
      default:
        break;
    }
  })
  .listen(port);
console.log(`server started with port ${port}`);

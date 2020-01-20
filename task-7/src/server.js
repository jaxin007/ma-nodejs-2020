const http = require('http');
const { memoryMonitor } = require('./memoryMonitor');

console.clear();
const port = 8000;
http
  .createServer(function(req, res) {
    const { method, url } = req;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const totalMem = { totalMem: memoryMonitor.totalMem };

    switch (method) {
      case 'GET':
        console.log(`limit is ${JSON.stringify(totalMem)}`);
        if (url === '/limit') res.write(JSON.stringify(totalMem));
        res.end();
        break;
      default:
        break;
    }
  })
  .listen(port);
console.log(`server started with port ${port}`);

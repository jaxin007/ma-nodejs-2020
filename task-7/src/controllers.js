const url = require('url');
const { getSystemStatus } = require('./get-system-status');

const systemStatus = getSystemStatus();

function parseBody(req, callback) {
  const body = [];
  req
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => callback(JSON.parse(Buffer.concat(body).toString())));
}

function defaultController(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(`Status: ${res.statusCode}`);
  res.end();
}

function limitController(req, res, limit) {
  switch (req.method) {
    case 'GET':
      if (systemStatus.freeMem < limit) {
        res.write(
          JSON.stringify({ LIMIT: limit, Warning: 'Available memory is under the defined limit' }),
        );
      } else {
        res.write(JSON.stringify({ LIMIT: limit }));
      }
      res.end();
      break;

    case 'POST':
      parseBody(req, (body) => {
        // eslint-disable-next-line no-param-reassign
        limit = body.limit;
        res.write(`Response code: ${res.statusCode}\nResponse body:\n`);
        res.write(
          JSON.stringify({
            message: `Minimum free memory limit is successfully set to ${limit} MB`,
          }),
        );
        res.end();
      });
      break;

    default:
      defaultController(req, res);
  }
}

function metricsController(req, res) {
  const { filter } = url.parse(req.url, true).query;
  const allowedFilters = ['total', 'free', 'allocated'];
  switch (req.method) {
    case 'GET':
      if (filter && !allowedFilters.includes(filter)) {
        defaultController(req, res);
      }

      switch (filter) {
        case 'total':
          res.write(JSON.stringify({ totalMem: systemStatus.totalMem }));
          res.end();
          break;

        case 'free':
          res.write(JSON.stringify({ freeMem: systemStatus.freeMem }));
          res.end();
          break;

        case 'allocated':
          res.write(JSON.stringify({ allocatedMem: systemStatus.allocatedMem }));
          res.end();
          break;

        default:
          res.write(JSON.stringify(systemStatus));
          res.end();
          break;
      }

      break;

    default:
      defaultController(req, res);
  }
}

module.exports = {
  metricsController,
  limitController,
};

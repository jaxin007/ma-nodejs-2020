const url = require('url');
const { getSystemStatus } = require('./get-system-status');

function parseBody(req) {
  const body = [];
  req
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => JSON.parse(Buffer.concat(body).toString()));
}

function defaultController(req, res) {
  res.statusCode = 404;
  res.end();
}

function limitController(req, res, limit) {
  switch (req.method) {
    case 'GET':
      if (getSystemStatus().freeMem < limit) {
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
  const systemStatus = getSystemStatus();
  const { filter } = url.parse(req.url, true).query;
  const allowedFilters = ['total', 'free', 'allocated'];

  const totalMemToOut = systemStatus.totalMem;
  const freeMemToOut = systemStatus.freeMem;
  const allocatedMemToOut = systemStatus.allocatedMem;

  switch (req.method) {
    case 'GET':
      if (!allowedFilters.includes(filter) && filter) {
        defaultController(req, res);
        return;
      }

      switch (filter) {
        default:
          res.write(JSON.stringify(systemStatus));
          res.end();
          break;

        case 'total':
          res.write(JSON.stringify({ totalMem: totalMemToOut }));
          res.end();
          break;

        case 'free':
          res.write(JSON.stringify({ freeMem: freeMemToOut }));
          res.end();
          break;

        case 'allocated':
          res.write(JSON.stringify({ allocatedMem: allocatedMemToOut }));
          res.end();
          break;
      }
      return;

    default:
      defaultController(req, res);
  }
}

module.exports = {
  metricsController,
  limitController,
  defaultController,
};

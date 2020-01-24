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
  res.write(JSON.stringify({ serverStatus: 'working' }));
  res.end();
}

function limitController(req, res, limit) {
  switch (req.method) {
    case 'GET':
      res.write(JSON.stringify({ LIMIT: limit }));
      if (systemStatus.freeMem < limit) {
        res.write(JSON.stringify({ Warning: 'Available memory is under the defined limit' }));
      }
      res.end();
      break;

    case 'POST':
      parseBody(req, (body) => {
        // eslint-disable-next-line no-param-reassign
        limit = body.limit;
        res.write(JSON.stringify({ ENV_LIMIT: limit }));
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
        res.write(
          JSON.stringify({
            errorCode: 400,
            errorMessage: `You cannot use this filter: '${filter}'. Allowed filters are: ${allowedFilters}`,
          }),
        );
        res.end();
        return;
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

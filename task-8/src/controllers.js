const url = require('url');
const { getSystemStatus } = require('../system-info/get-system-status');
const { getRandomInt } = require('./random');

let limit = 1000;

function parseBody(req, callback, onError) {
  const body = [];
  req
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => {
      try {
        callback(JSON.parse(Buffer.concat(body).toString()));
      } catch (err) {
        onError(err);
      }
    });
}

function defaultController(req, res) {
  res.statusCode = 404;
  res.end();
}

function limitController(req, res) {
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
      parseBody(
        req,
        (body) => {
          // eslint-disable-next-line no-param-reassign
          limit = body.limit;
          res.write(
            JSON.stringify({
              message: `Minimum free memory limit is successfully set to ${limit} MB`,
            }),
          );
          res.end();
        },
        (err) => {
          const error = err.toString();
          res.statusCode = 400;
          res.end(JSON.stringify({ error }));
        },
      );
      break;

    default:
      defaultController(req, res);
  }
}

function metricsController(req, res) {
  const systemStatus = getSystemStatus();
  const randomNumber = getRandomInt(5);
  const { filter } = url.parse(req.url, true).query;
  const allowedFilters = ['total', 'free', 'allocated'];

  const totalMemToOut = systemStatus.totalMem;
  const freeMemToOut = systemStatus.freeMem;
  const allocatedMemToOut = systemStatus.allocatedMem;
  let limitStatus = 'OK';

  if (systemStatus.freeMem < limit) {
    limitStatus = 'Available memory is under the defined limit';
  }

  if (randomNumber < 2) {
    res.statusCode = 404;
  }

  switch (req.method) {
    case 'GET':
      if (!allowedFilters.includes(filter) && filter) {
        res.statusCode = 400;
        res.end();
        return;
      }

      switch (filter) {
        default:
          res.write(
            JSON.stringify({
              message: limitStatus,
              total: totalMemToOut,
              free: freeMemToOut,
              allocatedMem: allocatedMemToOut,
            }),
          );
          res.end();
          break;

        case 'total':
          res.write(JSON.stringify({ message: limitStatus, total: totalMemToOut }));
          res.end();
          break;

        case 'free':
          res.write(JSON.stringify({ message: limitStatus, free: freeMemToOut }));
          res.end();
          break;

        case 'allocated':
          res.write(JSON.stringify({ message: limitStatus, allocated: allocatedMemToOut }));
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

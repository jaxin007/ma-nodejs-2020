const rp = require('request-promise');
const retry = require('retry');

const options = {
  method: 'GET',
  url: 'http://localhost:3030/metrics',
  json: true,
};

function rpn(TIME) {
  setInterval(() => {
    const operation = retry.operation({
      retries: 30,
      factor: 2,
      minTimeout: 100,
      randomize: false,
    });

    operation.attempt((currentAttempt) => {
      rp(options)
        .then((response) => {
          console.log(`Status:\n ${JSON.stringify(response)} on ${currentAttempt} attempt`);
        })
        .catch((error) => {
          console.error(`Status: ${error.statusCode}`);
        });
    });
  }, TIME);
}

module.exports = { rpn };

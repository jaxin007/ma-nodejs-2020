const request = require('request');

const retry = request('./retry');

const options = {
  method: 'GET',
  url: 'http://localhost:3030/metrics',
  json: true,
};

async function RPN() {
  const response = await request(options);
  console.log(response);
}

RPN().catch(() => {
  retry(RPN().response, 200, RPN());
});

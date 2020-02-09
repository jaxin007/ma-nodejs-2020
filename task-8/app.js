const cli = require('vorpal')();

const { axiosClient } = require('./src/clientAxios');
const { httpClient } = require('./src/httpClient');
const { rpn } = require('./src/clientRPN');

console.clear();
console.log(`Enter your command: \n-axios \n-http \n-rpn  \n-exit`);

cli.command('axios', 'Outputs "axios"').action(() => {
  console.log('\naxios client:\n');
  axiosClient(10000);
});

cli.command('http', 'Outputs "http"').action(() => {
  console.log('\nhttp client:\n');
  httpClient(10000);
});

cli.command('rpn', 'Outputs "request-promise"').action(() => {
  console.log('\nrequest-promise client:\n');
  rpn(10000);
});
cli.delimiter('app$').show();

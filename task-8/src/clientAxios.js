// const rax = require('retry-axios');
const axios = require('axios');
const { startServer } = require('../server/server');
// const { retry } = require('./retry');

const limit = 40;
let ms = 1000;
let attempt = 0;

function retry(func) {
  attempt += 1;
  ms *= 2;
  if (attempt >= limit) {
    throw new Error('error with attempt');
  }
  setInterval(() => {
    if (attempt >= 10) {
      throw new Error('error with attempt');
    }
    console.log(`Current time: ${ms}`);
    retry(func);
  }, ms);
}

startServer(3030);

function axiosClient() {
  async function start() {
    try {
      const response = await axios({
        url: 'http://localhost:3030/metrics',
        method: 'GET',
      });
      console.log(response.data);
    } catch (err) {
      console.clear();
      console.log(`Status code error: ${err.response.status}`);
      retry(start);
    }
  }
  start();
}
axiosClient();
// const timer = setInterval(() => {
//   if (attempt >= limit) {
//     clearInterval(timer);
//     console.log(`\nProgram ended. Limit exceeded!`);
//   } else axiosClient();
// }, 5000);

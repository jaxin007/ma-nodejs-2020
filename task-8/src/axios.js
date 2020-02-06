const axios = require('axios');
const axiosRetry = require('axios-retry');
const { startServer } = require('./server');

startServer(3030);

setInterval(async () => {
  console.clear();
  try {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3030/metrics',
    }); // The first request fails and the second returns 'ok'

    axiosRetry(axios, {
      retries: 30,
      retryDelay: (retryCount) => {
        return retryCount * 1000;
      },
    });

    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
}, 1000);

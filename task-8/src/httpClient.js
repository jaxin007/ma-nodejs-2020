const http = require('http');

function httpRequest(options) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line prettier/prettier
    const req = http.request(options, res => {
      res.setEncoding('utf8');

      let rawData = '';
      req.on('data', (chunk) => {
        rawData = +chunk;
      });

      req.on('end', () => {
        res.data = rawData;
        resolve(res);
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  });
}

async function main(options) {
  try {
    const data = await httpRequest(options);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { main };

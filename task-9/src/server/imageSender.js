/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const config = require('../config');
const { endResponse } = require('./helpers');

class DotsGenerator extends Transform {
  constructor() {
    super();
    this.length = 0;
  }

  _transform(chunk, encoding, next) {
    const fileSize = (this.length += chunk.length) / 1024;
    if (fileSize >= 1024) {
      process.stdout.write('.');
    }
    this.push(chunk);
    setTimeout(() => {
      next();
    }, 1000);
  }
}

function sendJPEG(res) {
  const readStream = fs.createReadStream(config.filePath, {
    highWaterMark: config.rate,
  });

  readStream.on('error', () => {
    endResponse(res, 500);
  });

  const slowerTransform = new DotsGenerator();

  pipeline(readStream, slowerTransform, res, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`\nStatus: ${res.statusMessage}`);
  });
}

module.exports = {
  sendJPEG,
};

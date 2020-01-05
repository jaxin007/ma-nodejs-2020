const { memoryMonitor } = require('./src/index');

// $env:RATE = 300;$env:LIMIT = 15000;$env:COLOR = 'false'; node app.js - start application with RATE = Value

const rate = process.env.RATE;
const limit = process.env.LIMIT;
const color = process.env.COLOR !== 'false';
memoryMonitor(rate, limit, color);

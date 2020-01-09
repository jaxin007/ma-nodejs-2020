const { memoryMonitor } = require('./src/index');

// $env:RATE = 300;$env:LIMIT = 15000;$env:COLOR = 'false'; node app.js - start application with RATE = Value

const rate = process.env.RATE === 1000;
const limit = process.env.LIMIT === 15000;
const color = process.env.COLOR !== 'false';
memoryMonitor(rate, limit, color);

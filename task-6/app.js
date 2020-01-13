const { memoryMonitor } = require('./src/index');

// $env:RATE = 300;$env:LIMIT = 15000;$env:COLOR = 'false'; node app.js - start application with RATE = Value

const rate = process.env.RATE || 1000;
const RATE = JSON.parse(rate);
const limit = process.env.LIMIT || 300;
const colorValue = process.env.COLOR !== 'false';
const color = JSON.parse(colorValue);
memoryMonitor(RATE, limit, color);

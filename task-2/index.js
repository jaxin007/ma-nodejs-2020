const sum = require('./task1');
const mars = require('./task2.js');
const setTimeOutPromise = require('./task3.js')

const lection = sum;

console.log(lection(1, 2, 4));
console.log(mars);
setTimeOutPromise(3000, 'some text');

const { throwDice } = require('./app');

let firstDice;
let secondDice;
let sum;

setTimeout(() => {
  firstDice = throwDice(6, 0);
  if (firstDice === 0) {
    throw new Error('Lost dice');
  }
  console.log(`first throw: ${firstDice}`);
  return firstDice;
}, 700);

setTimeout(() => {
  secondDice = throwDice(6, 0);
  if (secondDice === 0) {
    throw new Error('Lost dice');
  }
  console.log(`second throw: ${secondDice}`);
  return secondDice;
}, 2000);

setTimeout(() => {
  sum = firstDice + secondDice;
  console.log(`result: ${sum}`);
  return sum;
}, 3000);

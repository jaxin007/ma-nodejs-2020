const { throwDice } = require('./throwdicefunc');

let firstDice;
let secondDice;
let sum;

function startCallbacks() {
  setTimeout(() => {
    firstDice = throwDice(6, 0);
    if (firstDice === 0) {
      process.exit();
    }
    console.log(`CALLBACKS first throw: ${firstDice}`);
    return firstDice;
  }, 700);

  setTimeout(() => {
    secondDice = throwDice(6, 0);
    if (secondDice === 0) {
      process.exit();
    }
    console.log(`CALLBACKS second throw: ${secondDice}`);
    return secondDice;
  }, 2000);

  setTimeout(() => {
    sum = firstDice + secondDice;
    console.log(`CALLBACKS result: ${sum}`);
    return sum;
  }, 3000);
}

module.exports = {
  startCallbacks,
  firstDice,
  secondDice,
};

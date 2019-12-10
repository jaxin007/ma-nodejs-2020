const { throwDice } = require('./throwdicefunc');

let firstDice;
let secondDice;
let sum;

function startCallbacks() {
  setTimeout(() => {
    firstDice = throwDice(6, 0);
    if (firstDice === 0) {
      console.error('Lost dice');
      return Error
    }
    console.log(`first throw: ${firstDice}`);
    setTimeout(() => {
      secondDice = throwDice(6, 0);
      if (secondDice === 0) {
        console.error('Lost dice');
        return Error;
      }
      console.log(`second throw: ${secondDice}`);
      setTimeout(() => {
        sum = firstDice + secondDice;
        console.log(`result: ${sum}`);
        return sum;
      }, 3000);
      return secondDice;
    }, 2000);
    return firstDice;
  }, 700);
}

module.exports = {
  startCallbacks,
};

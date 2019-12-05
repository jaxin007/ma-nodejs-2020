const { throwDice } = require('./app');

let firstDice;
let secondDice;
let sum;

function throwDiceAfter(timeInMillis) {
  const nameOfVariable = new Promise((resolve, reject) => {
    setTimeout(() => {
      nameOfVariable = throwDice();
      if (nameOfVariable === 0) {
        return reject(new Error('Dice lost'));
      }
      resolve(nameOfVariable);
    }, timeInMillis);
  });
}

const secondThrow = new Promise((resolve, reject) => {
  setTimeout(() => {
    secondDice = throwDice();
    if (secondDice === 0) {
      return reject(new Error('Dice lost'));
    }
    resolve(secondDice);
  }, 2000);
});

const result = new Promise((resolve) => {
  setTimeout(() => {
    sum = firstDice + secondDice;
    resolve(sum);
  }, 3000);
});

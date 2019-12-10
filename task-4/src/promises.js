const { throwDice } = require('./throwdicefunc');

function promisesTask() {
  function throwDiceAfter(timeInMillis) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const diceThrow = throwDice(6, 0);
        if (diceThrow === 0) {
          return reject(new Error('Dice lost'));
        }
        return resolve(diceThrow);
      }, timeInMillis);
    });
  }

  function sum(a, b, timeInMillis) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = a + b;
        resolve(result);
      }, timeInMillis);
    });
  }

  throwDiceAfter(700)
    .then((firstThrow) => {
      console.log(`after 0.7 sec we got first throw: ${firstThrow}`);
      throwDiceAfter(2000)
        .then((secondThrow) => {
          console.log(`after 2 sec we got second throw: ${secondThrow}`);
          sum(firstThrow, secondThrow, 3000)
            .then((result) => {
              console.log(`after 3 sec we got result both throws: ${result}`);
            })
            .catch(console.error);
        })
        .catch(console.error);
    })
    .catch(console.error);
}
module.exports = {
  promisesTask,
};

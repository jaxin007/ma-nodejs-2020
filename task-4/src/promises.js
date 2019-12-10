const { throwDice } = require('./throwdicefunc');

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

function promisesTask() {
  let first;

  throwDiceAfter(700)
    .then((firstThrow) => {
      console.log(`PROMISE after 0.7 sec we got first throw: ${firstThrow}`);
      first = firstThrow;

      return throwDiceAfter(1300)
        .then((secondThrow) => {
          console.log(`PROMISE after 2 sec we got second throw: ${secondThrow}`);

          return sum(first, secondThrow, 1000)
            .then((result) => {
              console.log(`PROMISE after 3 sec we got result both throws: ${result}`);
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

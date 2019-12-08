const { throwDice } = require('./throwdicefunc');

function throwDiceAfter(timeInMillis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const diceThrow = throwDice(0, 6);
      if (diceThrow === 0) {
        return reject(new Error('Dice lost'));
      }
      resolve(diceThrow);
      return resolve();
    }, timeInMillis);
  });
}

throwDiceAfter(700)
  .then((firstThrow) => {
    throwDiceAfter(2000)
      .then((secondThrow) => {
        console.log(`after 0.7 sec we got first throw: ${firstThrow}`);
        console.log(`after 2 sec we got second throw: ${secondThrow}`);
        console.log(`result both throws is: ${firstThrow + secondThrow}`);
      })
      .catch(console.error);
  })
  .catch(console.error);

module.exports;

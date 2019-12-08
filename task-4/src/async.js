const { throwDice } = require('./throwdicefunc');

function asyncTask() {
  function throwDiceAfter(timeInMillis) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const diceThrow = throwDice(0, 6);
        if (diceThrow === 0) {
          return reject(new Error('Dice lost'));
        }
        resolve(diceThrow);
        return diceThrow;
      }, timeInMillis);
    });
  }

  async function boot() {
    const firstThrow = await throwDiceAfter(700);
    console.log(`after 0.7 sec we got first throw: ${firstThrow}`);
    const secondThrow = await throwDiceAfter(2000);
    console.log(`after 2 sec we got second throw: ${secondThrow}`);
    let result = setTimeout(() => {
      result = firstThrow + secondThrow;
      console.log(`after 3 sec we got result both throws: ${result}`);
    }, 3000);
  }
  boot();
}

module.exports = {
  asyncTask,
};

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

async function asyncTask() {
  let firstThrow;
  let secondThrow;
  try {
    firstThrow = await throwDiceAfter(700);
    console.log(`ASYNC after 0.7 sec we got first throw: ${firstThrow}`);
  } catch (err) {
    throw new Error('Lost dice');
  }
  try {
    secondThrow = await throwDiceAfter(2000);
    console.log(`ASYNC after 2 sec we got second throw: ${secondThrow}`);
  } catch (err) {
    throw new Error('Lost dice');
  }
  let result = setTimeout(() => {
    result = firstThrow + secondThrow;
    console.log(`ASYNC after 3 sec we got result both throws: ${result}`);
  }, 3000);
}

module.exports = {
  asyncTask,
};

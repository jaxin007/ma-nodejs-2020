const { throwDiceAfter } = require('./throwdicefunc');

function getResultAfter(a, b, timeInMillis) {
  return new Promise((resolve) => {
    let result = setTimeout(() => {
      result = a + b;
      return resolve(result);
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
    console.error('Lost dice');
  }
  try {
    secondThrow = await throwDiceAfter(1300);
    console.log(`ASYNC after 2 sec we got second throw: ${secondThrow}`);
  } catch (err) {
    console.error('Lost dice');
  }
  const result = await getResultAfter(firstThrow, secondThrow, 1000);
  console.log(`ASYNC after 3 sec we got result both throws: ${result}`);
}

module.exports = {
  asyncTask,
};

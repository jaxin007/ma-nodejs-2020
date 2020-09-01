function throwDice(maxNum, minNum) {
  const randomDice = Math.floor(Math.random() * (maxNum - minNum) + minNum);
  return randomDice;
}

function throwDiceAfter(timeInMillis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const diceThrow = throwDice(6, 0);
      if (diceThrow === 0) {
        return reject(console.error('Dice lost'));
      }
      return resolve(diceThrow);
    }, timeInMillis);
  });
}

module.exports = {
  throwDice,
  throwDiceAfter,
};

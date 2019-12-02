function throwDice(maxNum, minNum) {
  const randomDice = Math.floor(Math.random() * (maxNum - minNum) + minNum);
  return randomDice;
}

module.exports = {
  throwDice,
};

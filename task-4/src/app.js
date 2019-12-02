function throwDice(maxNum, minNum) {
  const randomDice = Math.floor(Math.random() * (maxNum - minNum + minNum) + minNum);
  return randomDice;
}

let firstDice;
let secondDice;
let sum;

setTimeout(() => {
  firstDice = throwDice(6, 1);
  console.log(`first throw: ${firstDice}`);
}, 700);

setTimeout(() => {
  secondDice = throwDice(6, 1);
  console.log(`second throw: ${secondDice}`);
}, 2000);

setTimeout(() => {
  sum = firstDice + secondDice;
  console.log(`result: ${sum}`);
}, 3000);

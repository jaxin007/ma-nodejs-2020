const { throwDice } = require('./throwdicefunc');

function startCallbacks() {
  setTimeout(() => {
    const firstDice = throwDice(6, 0);
    if (firstDice === 0) {
      console.error('Lost dice');
      return;
    }

    console.log(`CALLBACKS first throw is: ${firstDice}`);

    setTimeout(() => {
      const secondDice = throwDice(6, 0);
      if (secondDice === 0) {
        console.error('Lost dice');
        return;
      }

      console.log(`CALLBACKS second throw is: ${secondDice}`);

      setTimeout(() => {
        const result = firstDice + secondDice;
        console.log(`CALLBACKS result is: ${result}`);
      }, 1000);
    }, 1300);
  }, 700);
}
module.exports = {
  startCallbacks,
};

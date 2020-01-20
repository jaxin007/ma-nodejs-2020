const os = require('os');
const { toColorText } = require('./color');

const whiteColor = '\x1b[37m';
let greenColor = '\x1b[32m';
let redColor = '\x1b[31m';
// colores

function memoryMonitor(rate, limit, color) {
  let lastFreeMem = os.freemem();

  setInterval(() => {
    console.clear();
    const totalMem = os.totalmem() / (1024 * 1024);
    const freeMem = os.freemem() / (1024 * 1024);
    const allocatedMem = totalMem - freeMem;
    const delta = freeMem - lastFreeMem;
    lastFreeMem = freeMem;
    let freeMemText = freeMem.toFixed(3);
    let deltaText = delta;

    if (color === false) {
      redColor = whiteColor;
      greenColor = whiteColor;
    }
    console.log(`Total memory available: ${totalMem.toFixed(3)}, MB`);

    if (freeMem < limit) {
      freeMemText = toColorText(redColor, freeMemText);
    }

    console.log(`Free memory available: ${freeMemText} MB`);
    console.log(`Allocated memory: ${allocatedMem.toFixed(3)}MB`);

    if (delta < 0) {
      deltaText = toColorText(redColor, deltaText);
    } else {
      deltaText = toColorText(greenColor, deltaText);
    }
    console.log(`Delta for previous allocated mamory value: ${deltaText} MB`);

    if (freeMem < limit) {
      console.log(
        `${toColorText(
          redColor,
          '!!! ATTENTION: Available memory is under the defined limit !!!',
        )}`,
      );
    }
    return totalMem
  }, rate);
}

module.exports = {
  memoryMonitor,
};

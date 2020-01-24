const os = require('os');
const { toColorText } = require('./color');

const whiteColor = '\x1b[0m';
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

    const totalMemText = totalMem.toFixed(3);
    let freeMemText = freeMem.toFixed(3);
    let deltaText = delta.toFixed(3);
    const allocatedMemText = allocatedMem.toFixed(3);

    if (color === false) {
      redColor = whiteColor;
      greenColor = whiteColor;
    }
    console.log(`Total memory available: ${totalMemText}, MB`);

    if (freeMem < limit) {
      freeMemText = toColorText(redColor, freeMemText);
    }

    console.log(`Free memory available: ${freeMemText} MB`);
    console.log(`Allocated memory: ${allocatedMemText}MB`);

    if (delta < 0) {
      deltaText = toColorText(redColor, deltaText);
    } else {
      deltaText = toColorText(greenColor, deltaText);
    }
    console.log(`Delta for previous allocated memory value: ${deltaText} MB`);

    if (freeMem < limit) {
      console.log(
        `${toColorText(
          redColor,
          '!!! ATTENTION: Available memory is under the defined limit !!!',
        )}`,
      );
    }
  }, rate);
}

module.exports = {
  memoryMonitor,
};

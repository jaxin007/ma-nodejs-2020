const os = require('os');

const whiteColor = '\x1b[37m';
let greenColor = '\x1b[32m';
let redColor = '\x1b[31m';
let defaultColor = '\x1b[37m';
// colores

function memoryMonitor(rate, limit, color) {
  let lastFreeMem = os.freemem();
  setInterval(() => {
    os.freemem();
    os.totalmem();
    console.clear();
    const totalMem = os.totalmem() / (1024 * 1024);
    const freeMem = os.freemem() / (1024 * 1024);
    const allocatedMem = totalMem - freeMem;
    const delta = freeMem - lastFreeMem;
    lastFreeMem = freeMem;
    if (freeMem < limit) {
      defaultColor = redColor;
      greenColor = redColor;
      setTimeout(() => {
        console.log(
          `${redColor}!!! ATTENTION: Available memory is under the defined limit !!!${whiteColor}`,
        );
      }, 0);
    }
    if (color === false) {
      redColor = whiteColor;
      defaultColor = whiteColor;
      greenColor = whiteColor;
    }
    console.log(`Total memory available: ${totalMem.toFixed(3)}, MB`);
    console.log(`Free memory available:${defaultColor} ${freeMem.toFixed(3)} ${whiteColor}MB`);
    console.log(`Allocated memory: ${allocatedMem.toFixed(3)}MB`);
    console.log(
      `Delta for previous allocated mamory value: ${greenColor} ${delta} ${whiteColor}MB`,
    );
  }, rate);
}

module.exports = {
  memoryMonitor,
};

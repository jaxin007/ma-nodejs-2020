const os = require('os');

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

    if (color === false) {
      redColor = whiteColor;
      greenColor = whiteColor;
    }
    console.log(`Total memory available: ${totalMem.toFixed(3)}, MB`);

    if (freeMem > limit) {
      console.log(`Free memory available:${whiteColor} ${freeMem.toFixed(3)} ${whiteColor}MB`);
    } else {
      console.log(`Free memory available:${redColor} ${freeMem.toFixed(3)} ${whiteColor}MB`);
    }
    console.log(`Allocated memory: ${allocatedMem.toFixed(3)}MB`);

    if (delta < 0) {
      console.log(
        `Delta for previous allocated mamory value: ${redColor} ${delta} ${whiteColor}MB`,
      );
    } else {
      console.log(
        `Delta for previous allocated mamory value: ${greenColor} ${delta} ${whiteColor}MB`,
      );
    }

    if (freeMem < limit) {
      console.log(
        `${redColor}!!! ATTENTION: Available memory is under the defined limit !!!${whiteColor}`,
      );
    }
  }, rate);
}
memoryMonitor(1000, 10000, 'false');
module.exports = {
  memoryMonitor,
};

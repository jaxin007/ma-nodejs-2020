const os = require('os');

const greenColor = '\x1b[32m';
const redColor = '\x1b[31m';
const yellowColor = '\x1b[33m';
const blueColor = '\x1b[34m';
const whiteColor = '\x1b[37m';
//colores

const monitor = setInterval(() => {
  os.freemem();
  os.totalmem();
  const totalmem = os.totalmem().toFixed(3);
  const freemem = os.freemem().toFixed(3);
  console.log(whiteColor, 'Total memory available:', greenColor, totalmem);
  console.log(whiteColor, 'Free memory available:', redColor, freemem);
}, 1000);

setInterval(() => {
  console.clear();
}, 1400);

async function boot() {
  await monitor;
}
boot();

const os = require('os');

// const greenColor = '\x1b[32m';
// const redColor = '\x1b[31m';
// // const yellowColor = '\x1b[33m';
// // const blueColor = '\x1b[34m';
// const whiteColor = '\x1b[37m';
// colores

function memoryMonitor(Rate) {
  setInterval(() => {
    os.freemem();
    os.totalmem();
    const totalmem = os.totalmem() / (1024 * 1024);
    const freemem = os.freemem() / (1024 * 1024);
    console.log('Total memory available:', totalmem.toFixed(3), 'MB');
    console.log('Free memory available:', freemem.toFixed(3), 'MB');
    setInterval(() => {
      console.clear();
    }, Rate);
  }, Rate);
}

module.exports = {
  memoryMonitor,
};

const os = require('os');

function getSystemStatus() {
  const totalMemNoFixed = os.totalmem() / (1024 * 1024);
  const freeMemNoFixed = os.freemem() / (1024 * 1024);
  const allocatedMemNoFixed = totalMemNoFixed - freeMemNoFixed;

  const totalMem = totalMemNoFixed.toFixed(3);
  const freeMem = freeMemNoFixed.toFixed(3);
  const allocatedMem = allocatedMemNoFixed.toFixed(3);

  return {
    totalMem,
    freeMem,
    allocatedMem,
  };
}

module.exports = {
  getSystemStatus,
};

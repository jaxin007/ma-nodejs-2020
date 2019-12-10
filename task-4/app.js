const { startCallbacks } = require('./src/callbacks');
const { promisesTask } = require('./src/promises');
const { asyncTask } = require('./src/async');

function boot() {
  startCallbacks();
  setTimeout(promisesTask, 5000);
  setTimeout(asyncTask, 10000);
}

boot();

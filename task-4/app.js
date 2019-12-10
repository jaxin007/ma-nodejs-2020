const { startCallbacks } = require('./src/callbacks');
const { promisesTask } = require('./src/promises');
const { asyncTask } = require('./src/async');

async function boot() {
  await asyncTask();
  await startCallbacks();
  await promisesTask();
}

boot();

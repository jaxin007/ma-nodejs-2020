const { startCallbacks } = require('./src/callbacks');
const { promisesTask } = require('./src/promises');
const { asyncTask } = require('./src/async');

async function boot() {
  startCallbacks();

  setTimeout(() => {
    promisesTask();
  }, 4000);

  setTimeout(() => {
    asyncTask();
  }, 8000);
}

boot();

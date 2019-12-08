const {asyncTask} = require('./src/async')
const {callbacksTask} = require('./src/async')
const {promisesTask} = require('./src/promises')

async function boot(){
    await callbacksTask
    await promisesTask
    await asyncTask
}

boot()
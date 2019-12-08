const {callbacksTask} = require('./src/async')
const {promisesTask} = require('./src/promises')
const {asyncTask} = require('./src/async')


async function boot(){
    await callbacksTask
    await promisesTask
    await asyncTask
}

boot()
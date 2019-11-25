const { sum: lection, mars: spaceObject, setTimeOutPromise } = require('./src/index.js');

const result = lection(1, 3, 3);

async function boot() {
    console.log(result);
    await setTimeOutPromise(1000, 'some text');
    console.log(spaceObject);
};

boot();

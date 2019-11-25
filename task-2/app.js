const { sum: lection, mars: spaceObject, setTimeOutPromise } = require('./src/index.js');

const result = lection(1, 2, 3);

async function boot() {
    console.log(result);
    setTimeOutPromise(1000, '2');
    console.log(spaceObject);
};

boot();

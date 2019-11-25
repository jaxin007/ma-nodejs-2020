const { sum: lection, earth: spaceObject, setTimeOutPromise } = require('./src');

const result = lection(1, 3, 3);


async function boot() {
    console.log(result);
    await console.log(setTimeOutPromise(1000, 'some text'));
    console.log(spaceObject.toString());
};

boot();

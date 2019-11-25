const { sum: lection, earth: spaceObject, setTimeOutPromise } = require('./src');

const result = lection(1, 3, 3);

async function boot() {
  console.log(result);
  const secResult = await setTimeOutPromise(3000, 'some text');
  console.log(secResult);
  console.log(spaceObject.toString());
}

boot();

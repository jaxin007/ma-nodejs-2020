const { sum: lection, earth: spaceObject, setTimeOutPromise } = require('./src');

async function boot() {
  console.log(lection(1, 3, 3));
  const secResult = await setTimeOutPromise(3000, 'some text');
  console.log(secResult);
  console.log(spaceObject.toString());
}

boot();

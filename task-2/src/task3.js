function setTimeOutPromise(time, text) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(text);
    }, time);
  });
}
// setTimeOutPromise(1000, 'some text')
module.exports = setTimeOutPromise;

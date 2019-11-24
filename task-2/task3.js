function setTimeOutPromise(time, text) {
    console.log('start');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            console.log(text)
        }, time);
    });
}

module.exports = setTimeOutPromise;

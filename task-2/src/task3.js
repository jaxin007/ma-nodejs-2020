function setTimeOutPromise(time, text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            console.log(text)
        }, time);
    });
}

module.exports = setTimeOutPromise;

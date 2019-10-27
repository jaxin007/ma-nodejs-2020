console.log('start');

function setTimeOutPromise(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

setTimeOutPromise(2000)
    .then(() => console.log('done'));
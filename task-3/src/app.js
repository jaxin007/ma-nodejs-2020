function isPrime(num) {
  if (num <= 1) return false; // negatives
  if (num % 2 == 0 && num > 2) return false; // even numbers
  const s = Math.sqrt(num); // store the square to loop faster
  for (let i = 3; i <= s; i++) {
    // start from 3, stop at the square, increment
    if (num % i === 0) return false; // modulo shows a divisor was found
  }
  return true;
}

let theBiggestNumber = 0;
let isLoopEnded = false;
const date = +new Date();

setTimeout(() => {
  isLoopEnded = true;
}, 1000);

for (let i = 0; ; i++) {
  if (isPrime(i)) {
    theBiggestNumber = i;
  }
  if (+new Date() - date >= 5000) {
    console.log(`${+new Date()}:-- IN PROCESS -- Biggest prime number found: ${theBiggestNumber}`);
    break;
  }
}

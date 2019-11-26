function isPrime(num) {
  if (num <= 1) return false; // negatives
  if (num % 2 === 0 && num > 2) return false; // even numbers
  const s = Math.sqrt(num); // store the square to loop faster
  for (let i = 3; i <= s; i += 1) {
    // start from 3, stop at the square, increment
    if (num % i === 0) return false; // modulo shows a divisor was found
  }
  return true;
}

let theBiggestNumber = 0;
const date = +new Date();

for (let i = 0; ; i += 1) {
  if (isPrime(i)) {
    theBiggestNumber = i;
  }
  if (+new Date() - date >= 5000) {
    console.log(`${+new Date()}:-- IN PROCESS -- Biggest prime number found: ${theBiggestNumber}`);
    break;
  }
}

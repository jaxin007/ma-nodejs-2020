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

let theBiggestPrimeNumber = 1;
let number = 1;

setInterval(() => {
  number += 1;
  if (isPrime(number)) {
    theBiggestPrimeNumber = number;
  }
  console.log(
    `${Date.now()}:-- IN PROCESS -- Biggest prime number found: ${theBiggestPrimeNumber}`,
  );
}, 1000);

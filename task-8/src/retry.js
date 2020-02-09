async function retry(result, func) {
  if (result.statusCode === lastStatusCodeError) ms *= 2;
  else ms = 100;
  errorCounting += 1;
  if (errorCounting >= limit) return 1;
  lastStatusCodeError = result.statusCode;
  setTimeout(() => {
    func();
  }, ms);

  return 0;
}

module.exports = { retry };

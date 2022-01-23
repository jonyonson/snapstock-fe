const currencyToSymbol = {
  USD: '$',
  BTC: '₿',
};

function commaSeparatedThousands(num, decimals) {
  return Number(num)
    .toFixed(decimals)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function isNumberFloat(num) {
  return num % 1 !== 0;
}

export default function formatNumber(num, options) {
  const currency = options?.currency;
  const suffix = options?.suffix;
  const change = options?.change;
  const decimals = options?.decimalPlaces || 2;

  let formattedNumber = commaSeparatedThousands(num, decimals);

  // If a number comes in as a whole integer, return it as a whole integer
  // unless the user has specified a decimal place
  // volume should not be represented as a float for example
  if (!isNumberFloat(num) && !options?.decimalPlaces) {
    formattedNumber = formattedNumber.split('.')[0];
  }

  // show currency symbol
  if (currency) {
    formattedNumber = currencyToSymbol[currency] + formattedNumber;
  }

  // show %, M (millions), or B (billions)
  if (suffix) {
    formattedNumber += suffix;
  }

  // show '+' prefix to represent positive change
  if (change) {
    formattedNumber = Number(num) > 0 ? `+${formattedNumber}` : formattedNumber;
  }

  return formattedNumber;
}

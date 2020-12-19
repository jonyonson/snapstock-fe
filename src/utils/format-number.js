const currencyToSymbol = {
  USD: '$',
  BTC: '₿',
};

export default function formatNumber(n, options) {
  const currency = options?.currency;
  const suffix = options?.suffix;
  const change = options?.change;
  const decimals = options?.decimalPlaces || 2;

  let formattedNumber = commaSeparatedThousands(n, decimals);

  // If a number comes in as a whole integer, return it as a whole integer
  // volume should not be represented as a float for example
  if (!isNumberFloat(n)) {
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
    formattedNumber = Number(n) > 0 ? `+${formattedNumber}` : formattedNumber;
  }

  return formattedNumber;
}

function commaSeparatedThousands(n, decimals) {
  return Number(n)
    .toFixed(decimals)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function isNumberFloat(n) {
  return n % 1 !== 0;
}

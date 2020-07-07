type Symbol = '%' | '$' | 'B' | 'M';

export default function formatNumber(
  n: number,
  options?: {
    symbol?: Symbol;
    change?: boolean;
    decimalPlaces?: number;
  },
) {
  let decimalPlaces = options?.decimalPlaces ?? 2;
  let symbol = options?.symbol;
  let change = options?.change;

  let numberWithCommas = Number(n)
    .toFixed(decimalPlaces)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (!isNumberFloat(n)) {
    numberWithCommas = numberWithCommas.split('.')[0];
  }

  // if number is a percent or a number presented in ...
  // billions (B) or millions (M) then add symbol to end
  // else symbol is a currency symbol and should be added to beginning
  let formattedNumber;
  if (symbol === '%' || symbol === 'B' || symbol === 'M') {
    formattedNumber = numberWithCommas + symbol;
  } else {
    formattedNumber = symbol ? symbol + numberWithCommas : numberWithCommas;
  }

  // show the '+' sign to represent positive change
  if (change) {
    formattedNumber = Number(n) > 0 ? `+${formattedNumber}` : formattedNumber;
  }

  return formattedNumber;
}

function isNumberFloat(n: number) {
  return Number(n) % 1 !== 0;
}

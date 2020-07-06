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

  let withCommas = Number(n)
    .toFixed(decimalPlaces)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (!isNumberFloat(n)) {
    withCommas = withCommas.split('.')[0];
  }

  // if number is a percent or a number presented in ...
  // billions (B) or millions (M) then add symbol to end
  // else symbol is a currency symbol and should be added to beginning
  let withSymbols;
  if (symbol === '%' || symbol === 'B' || symbol === 'M') {
    withSymbols = withCommas + symbol;
  } else {
    withSymbols = symbol ? symbol + withCommas : withCommas;
  }

  let formattedNumber = withSymbols;

  // show the '+' sign to represent positive change
  if (change) {
    formattedNumber = Number(n) > 0 ? `+${formattedNumber}` : formattedNumber;
  }

  return formattedNumber;
}

function isNumberFloat(n: number) {
  return Number(n) % 1 !== 0;
}

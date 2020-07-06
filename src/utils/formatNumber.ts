type Symbol = '%' | '$' | 'B' | 'M';

export default function formatNumber(
  n: number,
  symbol?: Symbol,
  change?: boolean,
  decimalPlaces?: number,
) {
  change = change ?? false;
  decimalPlaces = decimalPlaces ?? 2;

  let number = Number(n)
    .toFixed(decimalPlaces)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (!isNumberFloat(n)) {
    number = number.split('.')[0];
  }

  // if number is a percent or a number presented in ...
  // billions (B) or millions (M) then add symbol to end
  // else symbol is a currency symbol and should be added to beginning
  if (symbol === '%' || symbol === 'B' || symbol === 'M') {
    number += symbol;
  } else {
    number = symbol ? symbol + number : number;
  }

  // show the '+' sign to represent change
  if (change) number = Number(n) > 0 ? `+${number}` : number;

  return number;
}

function isNumberFloat(n: number) {
  return Number(n) % 1 !== 0;
}

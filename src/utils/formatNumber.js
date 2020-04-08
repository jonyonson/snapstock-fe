function formatNumber(num, symbol = null, change = false, decimalPlaces = 2) {
  const isFloat = Number(num) % 1 !== 0;

  let number = Number(num)
    .toFixed(decimalPlaces)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (!isFloat) number = number.split('.')[0];

  // if number is a percent or a number presented in ...
  // billions (B) or millions (M) then add symbol to end
  // else symbol is a currency symbol and should be added to beginning
  if (symbol === '%' || symbol === 'B' || symbol === 'M') {
    number += symbol;
  } else {
    number = symbol ? symbol + number : number;
  }

  // show the '+' sign to represent change
  if (change) {
    number = Number(num) > 0 ? `+${number}` : number;
  }

  return number;
}

export default formatNumber;

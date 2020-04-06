function formatNumber(num, symbol = null, change = false) {
  const isFloat = Number(num) % 1 !== 0;

  let number = Number(num)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (!isFloat) number = number.split('.')[0];

  if (symbol === '%') {
    number += '%';
  } else {
    number = symbol ? symbol + number : number;
  }

  if (change) {
    number = Number(num) > 0 ? `+${number}` : number;
  }

  return number;
}

export default formatNumber;

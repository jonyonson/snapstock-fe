import formatNumber from './formatNumber';

// returns numbers formatted in terms of how many billions or millions
// 1734694653 -> 1.7B
// 123875456 -> 123.9M
function formatHugeNumber(num) {
  let numString;
  // if number is greater than 1 billion
  if (num > 1e9) {
    // get number in billions
    num /= 1e9;
    numString = formatNumber(num, 'B', false, 1);
  } else {
    // get number in millions
    num /= 1e6;
    numString = formatNumber(num, 'M', false, 1);
  }

  return numString;
}

export default formatHugeNumber;

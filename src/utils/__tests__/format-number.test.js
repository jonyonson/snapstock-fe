import formatNumber from '../format-number';

describe('formatNumber', () => {
  it('should return a number as a comma separated string', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });

  it('should return a whole integer as a string with 2 decimals places when decimalPlaces is passed', () => {
    expect(formatNumber(1, { decimalPlaces: 2 })).toBe('1.00');
  });

  it('should return a string with 1 decimal place', () => {
    expect(formatNumber(100.3423, { decimalPlaces: 1 })).toBe('100.3');
  });

  it('should return a string with a percentage suffix', () => {
    expect(formatNumber(83.23, { suffix: '%' })).toBe('83.23%');
  });

  it('should return a string with a `+` prefix', () => {
    expect(formatNumber(83.23, { change: true })).toBe('+83.23');
  });
});

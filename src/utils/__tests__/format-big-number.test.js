import formatBigNumber from '../format-big-number';

describe('formatBigNumber', () => {
  it('returns numbers formatted in terms of how many billions or millions', () => {
    expect(formatBigNumber(1234567890)).toEqual('1.2B');
    expect(formatBigNumber(123456789)).toEqual('123.5M');
  });
});

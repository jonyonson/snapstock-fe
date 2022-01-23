import trimUrl from '../trim-url';

describe('trimUrl', () => {
  it('should return url without protocol, subdomain or trailing slashes', () => {
    expect(trimUrl('http://www.google.com/')).toEqual('google.com');
  });
});

import assert   from 'assert';
import helpers  from '../src/helpers'

describe('urlForCode', () => {
  it('generates URL correctly', () => {
    const req = { protocol: 'http', hostname: 'shorty.com', port: '80' };
    assert.equal(helpers.urlForCode(req, 'foo'), 'http://shorty.com/foo');

    req.port = 1234;
    assert.equal(helpers.urlForCode(req, 'foo'), 'http://shorty.com:1234/foo');
  });
});

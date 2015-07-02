import assert                          from 'assert';
import record                          from '../src/record';
import db                              from '../src/db';
import { assertPromise }               from './helpers/assert';
import { initDatabase, cleanDatabase } from './helpers/db';

describe('record', () => {
  before(cleanDatabase);
  beforeEach(initDatabase);
  afterEach(cleanDatabase);

  it('works', (done) => {
    const result = record.shorten('http://foo.com');
    assertPromise(result, done, (code) => assert.equal(code, 'HXRC'));
  });

  it('expands url', (done) => {
    const result = record.shorten('http://foo.com').then(record.expand);
    assertPromise(result, done, (code) => {
      assert.equal(code, 'http://foo.com')
    });
  });

  it('provides openings stats', (done) => {
    const result = record.shorten('http://foo.com').then(record.stats);
    assertPromise(result, done, (count) => assert.equal(count, 0));
  });

  it('logs openings stats', (done) => {
    const result = record
      .shorten('http://foo.com')
      .then(record.log)
      .then(record.stats);

    assertPromise(result, done, (count) => assert.equal(count, 1));
  });
});


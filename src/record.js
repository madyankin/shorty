import base58 from 'base58-native';
import db     from './db';

const tableName = 'records';

function nextCode() {
  return db
    .raw(`SELECT nextval('codeSeq')`)
    .then(result => {
      const code = new Buffer(result.rows[0].nextval);
      return base58.encode(code);
    });
}

function shorten(url) {
  return nextCode().then(code => {
    return db(tableName)
      .returning('code')
      .insert({ code, url })
      .then(() => code);
  });
}

function log(code) {
  return db(tableName)
    .where({ code })
    .increment('openCount', 1)
    .then(() => code);
}

function expand(code) {
  return db(tableName)
    .where({ code })
    .first()
    .then(row => row.url);
}

function stats(code) {
  return db(tableName)
    .where({ code })
    .first('openCount')
    .then(row => row.openCount.toString());
}

export default { shorten, log, expand, stats };

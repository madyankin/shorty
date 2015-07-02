import schema from 'knex-schema-builder';
import path   from 'path';
import db     from '../../src/db';

function initDatabase(done) {
  const schemaPath = path.join(__dirname, '../../db')

  schema.install(db, schemaPath, (err) => {
    if (err) done(err);
    setTimeout(done, 500);
  });
}

function cleanDatabase(done) {
  db.schema
    .dropTableIfExists('records')
    .dropTableIfExists('schema_globals')
    .raw('DROP SEQUENCE IF EXISTS codeSeq')
    .then(() => done())
    .done(null, done);
}

export default { initDatabase, cleanDatabase };

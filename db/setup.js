import db     from '../src/db';
import schema from 'knex-schema-builder';

console.log('Migrating...');

schema.install(db, __dirname, (err) => {
  if (err) console.error(err);

  console.log('Migrated!');
  process.exit();
});

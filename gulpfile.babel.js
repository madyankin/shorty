import gulp   from 'gulp';
import path   from 'path';
import schema from 'knex-schema-builder';
import db     from './src/db';

gulp.task('setup', () => {
  const schemaPath = path.join(__dirname, './db')

  schema.install(db, schemaPath, (err) => {
    if (err) console.error(err);
    process.exit();
  });
});

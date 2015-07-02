import gulp     from 'gulp';
import path     from 'path';
import schema   from 'knex-schema-builder';
import mocha    from 'gulp-mocha';
import db       from './src/db';

gulp.task('setup', () => {
  const schemaPath = path.join(__dirname, './db')

  schema.install(db, schemaPath, (err) => {
    if (err) console.error(err);
    if (cb) cb();
    process.exit();
  });
});

gulp.task('test', () => {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha())
    .once('error', () => process.exit(1))
    .once('end', () => process.exit());
});

gulp.task('default', ['test']);

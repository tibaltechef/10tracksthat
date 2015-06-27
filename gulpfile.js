var gulp = require('gulp');

gulp.task('clean', require('./.gtasks/clean'));

// assets
gulp.task('scripts', require('./.gtasks/scripts'));
gulp.task('styles', require('./.gtasks/styles'));

// dist
gulp.task('dist', [
  'clean',
  'scripts',
  'styles'
]);

gulp.task('server', ['dist'], require('./.gtasks/server').start);
gulp.task('watch', ['dist'], require('./.gtasks/watch'));
gulp.task('default', [
  'server',
  'watch'
]);
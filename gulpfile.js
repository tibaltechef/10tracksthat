var gulp = require('gulp');

gulp.task('clean', require('./.gtasks/clean'));

// assets
gulp.task('styles', require('./.gtasks/styles'));
gulp.task('scripts', require('./.gtasks/scripts'));

// lib
gulp.task('libstyles', require('./.gtasks/libstyles'));
gulp.task('libscripts', require('./.gtasks/libscripts'));

// dist
gulp.task('dist', [
  'clean',
  'styles',
  'scripts',
  'libstyles',
  'libscripts'
]);

gulp.task('server', ['dist'], require('./.gtasks/server').start);
gulp.task('watch', ['dist'], require('./.gtasks/watch'));
gulp.task('default', [
  'server',
  'watch'
]);
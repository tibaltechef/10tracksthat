var gulp = require('gulp');

var paths = require('./paths');
var config = require('./config');
var server = require('./server');

module.exports = function() {

  gulp.watch(paths.src.js + '/**/*', ['scripts']);
  gulp.watch(paths.src.css + '/**/*', ['styles']);

  gulp.watch(paths.src.components + '/**/*', ['scripts', 'styles']);
  
  gulp.watch([
    paths.dist._ + '/**',
    paths.src.server.views + '/**/*',
  ], server.refresh);
}
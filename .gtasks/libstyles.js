var gulp = require('gulp');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var bowerfiles = require('main-bower-files');

var paths = require('./paths');
var files = require('./files');

module.exports = function() {

  var cssfiles = bowerfiles('**/*.css');
  cssfiles.push(paths.src.csslib + '/*.css');
  
  return gulp.src(cssfiles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(debug())
    .pipe(concat(files.lib.css))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css));
}
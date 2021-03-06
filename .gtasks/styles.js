var gulp = require('gulp');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = require('./paths');
var files = require('./files');

module.exports = function () {
  
  return gulp.src(paths.src.css + '/*.css')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(debug())
    .pipe(concat(files.custom.css))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css));
}
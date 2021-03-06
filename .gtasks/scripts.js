var gulp = require('gulp');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = require('./paths');
var files = require('./files');

module.exports = function() {

  // fichiers persos
  return gulp.src(paths.src.js + '/**.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(debug())
    .pipe(uglify())
    .pipe(concat(files.custom.js))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js));
};
var gulp = require('gulp');
var debug = require('gulp-debug');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bowerfiles = require('main-bower-files');

var paths = require('./paths');
var files = require('./files');

module.exports = function() {

  // fichiers persos
  var app = gulp.src(paths.src.js + '/**.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(concat(files.custom.js))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js));

  // lib
  var sourcefiles = bowerfiles('**/*.js');
  sourcefiles.push(paths.src.jslib + '/*.js');
  var lib = gulp.src(sourcefiles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(concat(files.lib.js))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js));

  return merge(app, lib);
};
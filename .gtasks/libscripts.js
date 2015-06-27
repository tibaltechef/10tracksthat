var gulp = require('gulp');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bowerfiles = require('main-bower-files');

var paths = require('./paths');
var files = require('./files');

module.exports = function() {  
  // js
  var jsfiles = bowerfiles('**/*.js');
  jsfiles.push(paths.src.jslib + '/*.js');
  
  return gulp.src(jsfiles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(debug())
    .pipe(uglify())
    .pipe(concat(files.lib.js))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js));
}
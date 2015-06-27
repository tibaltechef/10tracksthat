// var fork = require('child_process').fork;

var gulp = require('gulp');
var gutil = require('gulp-util');
// var nodemon = require('gulp-nodemon');

// var nbb;
var paths = require('./paths');
var config = require('./config');

module.exports = {
  start : function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(config.livereload.port, function(){
      gutil.log('Started livereload server on http://localhost:' + config.livereload.port)
    });

    require('../' + config.server.file);
    // nbb = fork(config.server.file, process.argv.slice(2), {});
  },

  refresh: function (file) {
    gutil.log('Reloading (' + file.type + ')', file.path.replace(__dirname, ''))
    tinylr.changed({body : {files : [file.path]}})
  },

  // reload: function () {
  //   nbb.on('exit', function() {
  //     nbb = fork(config.server.file, process.argv.slice(2), {});
  //   });
  //   nbb.kill();
  // }
}

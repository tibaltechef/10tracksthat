var rimraf = require('rimraf')

var paths = require('./paths')

module.exports = function(){
  rimraf.sync(paths.dist.js);
  rimraf.sync(paths.dist.css);
}
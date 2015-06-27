var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var plm      = require('passport-local-mongoose');

var usersSchema = new Schema({
  username: String,
  passport: String
});

usersSchema.plugin(plm);

module.exports = mongoose.model('Users', usersSchema);
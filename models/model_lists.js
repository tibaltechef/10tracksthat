var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Users    = require ('./model_users');
var Tracks   = require ('./model_tracks');

var listSchema = new Schema({
  slug: String, 
  name: String,
  description: String,
  tags: [String],
  vote: Number,
  date: { type: Date, default: Date.now },
  tracks: [
    {
      type: Schema.ObjectId,
      ref: 'Tracks'
    }
  ], 
  user : {
    type: Schema.ObjectId,
    ref: 'Users'
  }
});

listSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('Lists', listSchema);
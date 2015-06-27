var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var tracksSchema = new Schema({    
  slug: String,
  artist: String,
  title: String,
  description: String,
  vote: Number,
  urls: {
    youtube: {
      id: String,
      url: String
    deezer: {
      id : String,
      url : String
    },
    spotify: {
      id: String,
      url: String
    }
  }
});

tracksSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('Tracks', tracksSchema);
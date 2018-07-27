const mongoose = require('mongoose');
const Comment = require('./commentModel');

var beerSchema = mongoose.Schema({
  beername: String,
  breweryname:String,
  type: String,
  description: String,
  abv: Number,
  rating: Number,
  rank: Number,
  imageUrl: String,
  comments: [{text: String, username: String, streamData: {}}]
});

let Beer = mongoose.model('Beer', beerSchema);


module.exports = Beer;
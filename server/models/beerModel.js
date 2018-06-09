const mongoose = require('mongoose');

var beerSchema = mongoose.Schema({
  beername: String,
  breweryname:String,
  type: String,
  description: String,
  abv: Number,
  rank: Number,
  imageUrl: String,
  comments: [
      {
          user: String,
          text: String
      }
  ]
});

let Beer = mongoose.model('Beer', beerSchema);


module.exports = Beer;
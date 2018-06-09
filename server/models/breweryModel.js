const mongoose = require('mongoose');


var brewerySchema = mongoose.Schema({
  breweryName: {type: String, unique: true},
  rank: Number,
  beers: [String]
});

let Brewery = mongoose.model('Brewery', brewerySchema);

module.exports = Brewery;
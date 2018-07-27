const mongoose = require('mongoose');
const Comment = require('./commentModel');

var userSchema = mongoose.Schema({
  email: { type: String, unique: true, lowercase: true }, 
  username: { type: String, unique: true, lowercase: true },
  password: String,
  summary: String,
  comments: [String],
  picture: String,
  likes: {type: mongoose.Schema.Types.Mixed,
          default: {}},
  follows: {type: mongoose.Schema.Types.Mixed,
          default: {}},
  followers: {type: mongoose.Schema.Types.Mixed,
          default: {}},
  beers: [{}]
}, { minimize: false } );

let User = mongoose.model('User', userSchema);

module.exports = User;
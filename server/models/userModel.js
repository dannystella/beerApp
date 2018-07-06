const mongoose = require('mongoose');
const Comment = require('./commentModel');

var userSchema = mongoose.Schema({
  email: { type: String, unique: true, lowercase: true }, 
  username: { type: String, unique: true, lowercase: true },
  password: String,
  summary: String,
  comments: [String],
  beers: [{}]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
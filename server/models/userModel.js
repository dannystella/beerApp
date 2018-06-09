const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: { type: String, unique: true, lowercase: true }, 
  username: { type: String, unique: true, lowercase: true },
  password: String,
  summary: String,
  comments: [String],
  beers: [String]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
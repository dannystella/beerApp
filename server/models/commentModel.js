const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  text: String, 
  username: String
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  text: String, 
  username: String,
  streamData: 
    { 
    //   actor: String,
    // duration: String,
    // foreign_id: String,
    // id: String,
    // object: String,
    // // origin: undefined,
    // target:String,
    // time: String,
    // tweet: String,
    // verb: String 
  } 
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

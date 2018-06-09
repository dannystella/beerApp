const mongoose = require('mongoose');
const Promise = require('bluebird')

var articleSchema = mongoose.Schema({
  image: {source: String, size: String},
  title: String,
  caption: String,
  content: String,
  comments: []
})

let Article = mongoose.model('Article', articleSchema); 
Article = Promise.promisifyAll(Article);

module.exports = Article;
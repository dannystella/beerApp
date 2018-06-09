const mongoose = require('mongoose');
let Article = require('../models/articleModel');

let articleHelpers = {};


articleHelpers.grabAll = () => {
  return Article.find({}).exec()
}

articleHelpers.grabOne = (id) => {
  return Article.find({_id: id}).exec();
}


articleHelpers.save = (schema) => {
  return Article.create(schema, function(err) {
      if(err) {
          if (err.code == 11000) { // unique index conflict
              return ['Resource document already exists.'];
          }   
          console.log(err);
      } else {
          console.log("success");
      }
  });
}

module.exports = articleHelpers;
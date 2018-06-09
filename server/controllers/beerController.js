let Beer = require('../models/beerModel');

let beerHelpers = {};

beerHelpers.save = (schema) => {
  return Beer.create(schema, function(err) {
      if(err){
          if (err.code == 11000) { // unique index conflict
              return ['Resource document already exists.'];
          }   
          console.log(err);
      } else {
          console.log("success");
      }
  });
}

beerHelpers.delete = (id) => {
return Beer.findOneAndRemove({_id: id}).exec();
}

beerHelpers.grabAll = () => {
  return Beer.find({}).exec();
}

beerHelpers.grabOne = (id) => {
  return Beer.find({_id: id}).exec();
}

module.exports = beerHelpers;
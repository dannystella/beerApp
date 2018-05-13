const mongoose = require('mongoose');
const dataBaseCreds = require('./creds.js');
const dbUser = dataBaseCreds.dbUser;
const dbPassword = dataBaseCreds.dbPassword;
// const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds253889.mlab.com:53889/beeroiseur`);


var userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  summary: String,
});

var beerSchema = mongoose.Schema({
    beername: String,
    breweryname:String,
    type: String,
    description: String,
    abv: Number,
    rank: Number,
    imageUrl: String
});

var brewerySchema = mongoose.Schema({
    breweryName: {type: String, unique: true},
    rank: Number,
    beers: [String]
});

let User = mongoose.model('User', userSchema);
let Beer = mongoose.model('Beer', beerSchema);
let Brewery = mongoose.model('Brewery', brewerySchema);

var helpers = {};
helpers.userHelpers = {};
helpers.beerHelpers = {};
helpers.breweryHelpers = {};

helpers.userHelpers.save = (schema) => {
    return User.create(schema, function(err) {
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

helpers.beerHelpers.save = (schema) => {
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

helpers.beerHelpers.grabAll = () => {
    return Beer.find({}).exec();
}

helpers.beerHelpers.grabOne = (id) => {
    return Beer.find({rank: id}).exec();
}

helpers.breweryHelpers.save = (schema) => {
    return Brewery.create(schema, function(err) {
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

module.exports = helpers;
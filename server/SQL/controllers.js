const mysql = require('mysql')


    //Connect to SQL

        const db = mysql.createConnection({
        host: "localhost",
        port : '3306', 
        user:"root", 
        password: 'password',
        database: 'beer',
        // insecureAuth : true
    });

    db.connect((err) => {
        if(err){
          console.log('Error connecting to Db', err);
        } else {
            console.log('Connection established');
        }
      });


let controllers = {};

controllers.insertBrewery = (brewery) => {
  db.query(
  `INSERT INTO brewery(breweryName) VALUES("${brewery}");`, function(err, data){
        if(err) {
          console.log(err)
        }
      })
}

controllers.insertBeer = (beerObject) => {
  db.query(
  `INSERT INTO beers(beerName, typ, descr, abv, rankk) VALUES("${beerObject.name}", "${beerObject.type}", "${beerObject.description}", "${beerObject.abv}", "${beerObject.rank}" );`, function(err, data){
        if(err) {
          console.log(err)
        }
      })
}

//  module.exports.db = db;    
 module.exports = controllers;

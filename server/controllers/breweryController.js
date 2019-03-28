let Brewery = require('../models/breweryModel');

let breweryHelpers = {};

breweryHelpers.save = (schema) => {
    return Brewery.create(schema, function (err) {
        if (err) {
            if (err.code == 11000) { // unique index conflict
                return ['Resource document already exists.'];
            }
            console.log(err);
        } else {
            console.log("success");
        }
    });
}

module.exports = breweryHelpers;

let articleHelpers = require('./articleController');
let beerHelpers = require('./beerController');
let breweryHelpers = require('./breweryController');
let userHelpers = require('./userController');
let commentHelpers = require('./commentController');

var helpers = {};

helpers.articleHelpers = articleHelpers;
helpers.beerHelpers = beerHelpers;
helpers.breweryHelpers = breweryHelpers;
helpers.commentHelpers = commentHelpers;
helpers.userHelpers = userHelpers;

module.exports = helpers;
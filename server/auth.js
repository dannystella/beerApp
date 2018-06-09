const jwt = require('jwt-simple');
const User = require('../modelController');
const Authentication = require('./authController');


module.exports = function(app) {
  app.post('/signup', Authentication.signup);
}
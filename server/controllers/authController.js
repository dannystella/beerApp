const jwt = require('jwt-simple');
const config = require('../config.js');
const User = require('../models/userModel');
let helpers = require('./reducerController');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
 
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  console.log("auth", req.user)
  res.send({token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const username = req.body.username;
  let password = req.body.password;
  const summary = req.body.summary;
  const comments = req.body.comments;


  if(!email || !password) {
    return res.status(422).send({error: "You must provide an email and password"});
  }
  //See if user with given email exists
  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return (err);
    }
      //if so, return err
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }
    //  console.log(helpers);
    //if not, create user
    helpers.userHelpers.hashPassword(password, (hashedPassword) => {
      helpers.userHelpers.save({
        email: email,
        username: username,
        password: hashedPassword,
        summary: summary,
        comments: comments
      })
        .then((user) => {
          res.send({token: tokenForUser(user)})
        });
      })
    })




}
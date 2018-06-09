const bcrypt = require('bcrypt');
// const signin = require('./userController/authController').signin;
// const signup = require('./userController/authController').signup;
let User = require('../models/userModel');

let userHelpers = {};

// userHelpers.signin = signin;
// userHelpers.signup = signup;

userHelpers.hashPassword = (password, cb) => {
  // get access to the user model
  // generate a salt then run callback
    // hash (encrypt) our password using the salt
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) { return (err); }
      // overwrite plain text password with encrypted password
      password = hash;
      cb(password);
    });
}

userHelpers.comparePassword = function(candidatePassword, hashedPassword, cb) {
  console.log('hap', hashedPassword);
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

userHelpers.save = (schema) => {
  return User.create(schema)
  .then((user) => {
    return user;

  })
}

module.exports = userHelpers;
const bcrypt = require('bcrypt');

let User = require('../models/userModel');

let userHelpers = {};

// userHelpers.signin = signin;
// userHelpers.signup = signup;

userHelpers.hashPassword = (password, cb) => {
  // get access to the user model
  // generate a salt then run callback
  // hash (encrypt) our password using the salt
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) { return (err); }
    // overwrite plain text password with encrypted password
    password = hash;
    cb(password);
  });
}

userHelpers.comparePassword = function (candidatePassword, hashedPassword, cb) {
  bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
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
userHelpers.findAll = () => {
  return User.find({}).exec();
}

userHelpers.getUser = (id) => {
  return User.find({ _id: id }).exec();
}

userHelpers.update = (id, specField, specChange) => {
  userHelpers.getUser(id)
    .then((user) => {
      user.specField = user.specChange;
      user.save();
    })
}

module.exports = userHelpers;
const passport = require('passport');
const User = require('../../models/userModel');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const helpers = require('../reducerController');
//local strategy
const localOptions = {usernameField: 'username'};
const localLogin = new LocalStrategy({}, function(username, password, done) {
  //verify username and password, call done if correct otherwise call done with false
  User.findOne({ username: username}, function(err, user) {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false);
    }
    const pw = user.password;
    return helpers.userHelpers.comparePassword(password, pw, function (err, isMatch) {
      if(err) {
        return done(err);
      }
      if(!isMatch) {
        return done(null, false)
      } 
      return done(null, user);
    })
  })
})





//JWTstrategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //see if user id on payload exists in database other wise call done without user object


 User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false)
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false);
    }
 })
});

passport.use(jwtLogin);
passport.use(localLogin);
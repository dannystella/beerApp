const router = require('express').Router();
const helpers = require('../controllers/reducerController');
const authorization = require('../controllers/authController');
const passportService = require('../controllers/services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.get('/', requireAuth, function(req, res) {
  res.send({hi: 'there'})
})

router.post('/signin', requireSignin, authorization.signin);
router.post('/signup', authorization.signup);


module.exports = router;
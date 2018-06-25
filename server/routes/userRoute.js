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

router.post('/addcomments', requireAuth, function(req, res) {
  helpers.commentHelpers.save(req.body).then(() => {
    res.sendStatus(200);
  })
})

router.delete('/deletecomments/:id', function(req, res) {
  let commentObj = {};
  commentObj.beerId = req.body.params;
  commentObj.commentId = req.params.id;
  helpers.beerHelpers.deleteComment(commentObj)
  .then(() => {
    res.sendStatus(200);
  })
})

router.put('/updatecomments/:id', function(req, res) {
  let commentObj = {};
  commentObj.beerId = req.body.data.params;
  commentObj.commentId = req.params.id;
  helpers.beerHelpers.updateComment(commentObj)
  .then(() => {
    console.log("hit resend")
    res.sendStatus(200);
  })
})
module.exports = router;
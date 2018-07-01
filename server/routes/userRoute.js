const router = require('express').Router();
const helpers = require('../controllers/reducerController');
const authorization = require('../controllers/authController');
const passportService = require('../controllers/services/passport');
const passport = require('passport');
const config = require('../config.js');

//init stream
var stream = require('getstream');

// instantiate a new client (server side)
var client = stream.connect(config.STREAM_KEY, config.STREAM_SECRET, config.STREAM_APP_ID);



const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.get('/', requireAuth, function(req, res) {
  res.send({hi: 'there'})
})

router.post('/signin', requireSignin, authorization.signin);
router.post('/signup', authorization.signup);

//POST route for adding user comment
router.post('/addcomments', requireAuth, function(req, res) {
  let username = req.body.values.username;
  let text = req.body.values.text;
  let userFeed = client.feed('user', username );
  helpers.commentHelpers.save(req.body).then(() => {
    res.send(200);
  })
  userFeed.addActivity({
    actor: username,
    tweet: text,
    verb: 'tweet',
    object: 1
  }).then((data) => {
    console.log(data);
  })

})

//POST route for user feed
router.post('/followuser', function(req, res) {
  let username = req.body.values.username;
  let otherUser = req.body.values.otherUsername;
  let userFeed = client.feed('user', username );
  userFeed.follow('user', otherUser)
  .then((data) => {
    console.log(data);
    res.send(data);
  })
})



//GET router for userfeed
router.get('/getfeed', function(req, res) {
  // let username = req.body.values.username;
  let username = req.headers.username;
  // let otherUser = req.body.values.otherUsername;
  // let text = req.body.values.text;
  let userFeed = client.feed('user', username );
  userFeed.get({'limit': 30})
  .then((data) => {
    console.log(data);
    res.send(data);
  })
})


// router.get('/aggregatedfeed', function(req, res) {
//   let username = req.body.values.username;
//   let otherUser = req.body.values.otherUsername;
//   let text = req.body.values.text;
//   let userFeed = client.feed('user', username );
// })

//GET route for update feed
// router.get('/updatedfeed', function(req, res) {
//   let username = req.body.values.username;
//   let otherUser = req.body.values.otherUsername;
//   let text = req.body.values.text;
//   let userFeed = client.feed('user', username );

//   let promise = userFeed.subscri
// })

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
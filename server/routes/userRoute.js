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
  let commentObj = req.body;
  let beerReview = req.body.beerReview;
  beerReview.comments.push(req.body.values);
  console.log(beerReview);
  let username = req.body.values.username;
  let text = req.body.values.text;
  let now = new Date();
  let userFeed = client.feed('user', username );
  userFeed.addActivity({
    actor: username,
    verb: 'comment',
    object: 1,
    time: now.toISOString(),
    comment: text,
    foreign_id : 'comment:1',
  }).then((data) => {
    client.updateActivities([beerReview]).then((stuff) => {
      console.log(stuff, "stream data");
    })
    // commentObj.streamData = data;
    // helpers.commentHelpers.save(commentObj).then(() => {
    //   res.sendStatus(200);
    //})
  })
})

//DELETE route for user comments
router.delete('/deletecomments/:id', function(req, res) {
  let username = req.body.params.userinfo.username;
  let userFeed = client.feed('user', username );
  userFeed.removeActivity(req.params.id)
  .then((data) => {
    console.log(data);
  })
  let commentObj = {};
  commentObj.beerId = req.body.params;
  commentObj.commentId = req.body.params.commentId;
  // res.sendStatus(200);
  helpers.beerHelpers.deleteComment(commentObj)
  .then(() => {
    res.sendStatus(200);
  })
})

//PUT route for updating user comments
router.put('/updatecomments/:id', function(req, res) {
  let username = req.body.data.params.comment.username;
  let userFeed = client.feed('user', username );
  let newText = req.body.data.params.newComment.text;
  let streamData = req.body.data.params.comment.streamData;
  let now = new Date();
  streamData.comment = newText;
  // streamData.time = now.toISOString();
  // streamData.foreign_id = 'comment:1';
  client.updateActivities([streamData])
  .then((data) => {
    console.log("data is here" , data, "data is here");
  })
  let commentObj = {};
  commentObj.beerId = req.body.data.params;
  commentObj.commentId = req.params.id;
  helpers.beerHelpers.updateComment(commentObj)
  .then(() => {
    console.log("hit resend")
    res.sendStatus(200);
  })
})

//POST route for adding user beers
router.post('/addbeers', requireAuth, function(req, res) {
  let review = req.body.values;
  let username = req.body.userinfo.username;
  let beerId = req.body.values.beerId;
  let now = new Date();
  let userFeed = client.feed('user', username );
  helpers.beerHelpers.grabOne(beerId)
  .then((beer) => {
    beer = beer[0];
    // helpers.commentHelpers.save(req.body).then(() => {
    //   res.send(200);
    // })
    userFeed.addActivity({
      actor: username,
      beer: beer,
      comments: [],
      review: review,
      time: now.toISOString(),
      verb: 'addbeer',
      foreign_id : 'beer:1',
      object: 1
    }).then((data) => {
      res.send(data);
    })
  })

})

//DELETE route for deleting user beers
router.delete('/deletebeer/:id', requireAuth, function(req, res) {
  let username = req.body.values.username;
  let userFeed = client.feed('user', username );
  // helpers.commentHelpers.save(req.body).then(() => {
  //   res.send(200);
  // })
  userFeed.removeActivity(req.params.id)
  .then((data) => {
    res.send(data);
  })
})

//UPDATE route for deleting user beers
router.put('/updatebeer/:id', requireAuth, function(req, res) {
  console.log(req.params.id);
  // let username = req.body.values.username;
  // let userFeed = client.feed('user', username );
  // // helpers.commentHelpers.save(req.body).then(() => {
  // //   res.send(200);
  // // })
  // userFeed.removeActivity(req.params.id)
  // .then((data) => {
  //   res.send(data);
  // })
})

//POST route for following otheruser feed
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

//POST route for unfollowing otheruser feed
router.delete('/unfollowuser', function(req, res) {
  let username = req.body.values.username;
  let otherUser = req.body.values.otherUsername;
  let userFeed = client.feed('user', username );
  userFeed.unfollow('user', otherUser, keep_history=true)
  .then((data) => {
    console.log(data);
    res.send(data);
  })
})

//GET router for userfeed
router.get('/getfeed', function(req, res) {
  let username = req.headers.username;
  let userFeed = client.feed('user', username );
  userFeed.get({'limit': 100})
  .then((data) => {
    // console.log(data);
    res.send(data);
  })
})

module.exports = router;
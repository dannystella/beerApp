const router = require('express').Router();
const helpers = require('../controllers/reducerController');
const authorization = require('../controllers/authController');
const passportService = require('../controllers/services/passport');
const passport = require('passport');
const config = require('../config.js');
const cloudinary = require('cloudinary');
const knox = require('knox');
const async = require('async');
const waterfall = require('async-waterfall');
const uuid = require('node-uuid');
const read = require('file-reader');
const multer  = require('multer');
var path = require('path');
let destination = path.join(__dirname, './filestorage');
const upload = multer({ dest: destination, limits: {fileSize: 1000000000}});

const joe = 
//init cloudinary
cloudinary.config({ 
  cloud_name: config.cloud_name, 
  api_key: config.api_key,
  api_secret: config.api_secret
});

//init stream
var stream = require('getstream');

var client = stream.connect(config.STREAM_KEY, config.STREAM_SECRET, config.STREAM_APP_ID);

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.get('/', requireAuth, function(req, res) {
  res.send({hi: 'there'})
})

router.post('/signin', requireSignin, authorization.signin);
router.post('/signup', authorization.signup);


//POST route for image uploads 
router.post('/addimages', function(req, res) {


})


//POST route for adding user comment
router.post('/addcomments', requireAuth, function(req, res) {
  // console.log(req.body.beerReview);
  let commentObj = req.body;
  let beerReview = req.body.beerReview;
  commentObj.values = req.body.values;
  let username = req.body.values.username;
  let text = req.body.values.text;
  let now = new Date();
  let userFeed = client.feed('user', username );
  let foreignId = (beerReview.id);
  userFeed.addActivity({
    actor: username,
    verb: 'comment',
    object: 1,
    time: now.toISOString(),
    comment: text,
    foreign_id : foreignId,
  }).then((data) => {
    commentObj.streamData = data;
    beerReview.comments.push(commentObj);
    client.updateActivities([beerReview]).then((stuff) => {
      res.sendStatus(200);
    })
    // commentObj.streamData = data;
    // helpers.commentHelpers.save(commentObj).then(() => {
    //})
  })
})

//DELETE route for user comments
router.delete('/deletecomments/:id', function(req, res) {
  let username = req.body.params.beerInfo.actor;
  let userFeed = client.feed('user', username );
  let commentInfo = req.body.params.commentInfo;
  let beerInfo = req.body.params.beerInfo;
  for(let i = 0; i < beerInfo.comments.length; i++) {
    if(commentInfo.id === beerInfo.comments[i].streamData.id) {
      beerInfo.comments.splice(i, 1);
      client.updateActivities([beerInfo]).then((stuff) => {
        res.sendStatus(200);
      })
    } 
  }
})

//PUT route for updating user comments
router.put('/updatecomments/:id', function(req, res) {
  let newComment = req.body.data.params.comment;
  let pastInfo = req.body.data.params.pastInfo;
  let beerObj = req.body.data.params.pastInfo.beerObj;
  let username = req.body.data.params.comment.username;
  let userFeed = client.feed('user', username );
  let newText = newComment.text;
  let streamData = req.body.data.params.pastInfo.commentObj.streamData;
  let now = new Date();
  streamData.comment = newText;
  streamData.time = now;
  for(let i = 0; i < beerObj.comments.length; i++) {
    if(streamData.id === beerObj.comments[i].streamData.id) {
      beerObj.comments[i].streamData.comment = newText;
      client.updateActivities([beerObj]).then((stuff) => {
        res.sendStatus(200);
      })
    } 
  }
  client.updateActivities([streamData])
  .then((data) => {
    // console.log("data is here" , data, "data is here");
    res.sendStatus(200);
})
  // let commentObj = {};
  // commentObj.beerId = req.body.data.params;
  // commentObj.commentId = req.params.id;
  // helpers.beerHelpers.updateComment(commentObj)
  // .then(() => {
  //   console.log("hit resend")
  //   res.sendStatus(200);
  // })
})

//POST route for adding user beers
router.post('/addbeers', requireAuth, function(req, res) {
  // console.log(req.body);
  let review = req.body.values;
  let username = req.body.userinfo.username;
  let userId = req.body.userinfo._id
  let beerId = req.body.values.beerId;
  let now = new Date();
  let userFeed = client.feed('user', username );
  helpers.beerHelpers.grabOne(beerId)
  .then((beer) => {
    beer = beer[0];
    userFeed.addActivity({
      actor: username,
      actorId: userId,
      beer: beer,
      comments: [],
      likes: 0,
      review: review,
      time: now.toISOString(),
      verb: 'addbeer',
      foreign_id : userId,
      object: 1
    }).then((data) => {
      res.send(data);
    })
  })

})

//DELETE route for deleting user beers
router.delete('/deletebeer/:id',  function(req, res) {
  // console.log(req);
  let username = req.body.params.beerInfo.actor;
  let userFeed = client.feed('user', username );
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
router.post('/follows', function(req, res) {
  // console.log(req.body);
  const addFollow = (req) => {
    console.log("hit follow");
    let username = req.body.userInfo.username;
    let otherUser = req.body.userFollow.username;
    let userFeed = client.feed('user', username );
    // console.log(">>>>>>>>", req.body, "<<<<<<<<");
    userFeed.follow('user', otherUser)
    .then((data) => {
      // console.log(data);
      // res.send(data);
    })

  }

  const unFollow = (req) => {
    console.log("hit unfollow");
    let username = req.body.userInfo.username;
    let otherUser = req.body.userFollow.username;
    let userFeed = client.feed('user', username );
    userFeed.unfollow('user', otherUser, keep_history=true)
    .then((data) => {
      // console.log(data);
    })
  }
  let user = req.body.userInfo;
  let otherUser = req.body.userFollow;
  helpers.userHelpers.getUser(user._id).then((user) => {
    user = user[0];
    // console.log(user, "pre")
    let bool = user.follows[otherUser._id];
      if(bool === undefined) {
        bool = false;
      }
      if(bool === false) {
        user.follows[otherUser._id] = true;
      } else if(bool === true ) {
        user.follows[otherUser._id] = false;
      }
      // console.log(user, "post")
      user.markModified('follows');
      return user.save().then((data) => {
        console.log("hit response");
        res.send(data);
        if(user.follows[otherUser._id] === true) {
         return addFollow(req);
        } else {
         return unFollow(req);
        }
      })
  })
})

//POST route for adding likes 
router.post('/likes', function(req, res) {
  const handleAddLikes = (req) => {
    let streamData = req.body.values;
    let newLikes = streamData.likes + 1;
    let username = streamData.actor;
    let userFeed = client.feed('user', username );
    streamData.likes = newLikes;
    client.updateActivities([streamData]).then((stuff) => {
      res.sendStatus(200);
    })
}

const handleDeleteLikes = () => {
  let streamData = req.body.values;
  let newLikes = streamData.likes - 1;
  let username = streamData.actor;
  let userFeed = client.feed('user', username );
  streamData.likes = newLikes;
  client.updateActivities([streamData]).then((stuff) => {
    res.sendStatus(200);
  })
}

  let beerReview = req.body.values;
  let beerReviewId = beerReview.id;
  let userinfo = req.body.userAuth;

  helpers.userHelpers.getUser(userinfo._id).then((user) => {
    user = user[0];
    // console.log(user, "pre")
    let bool = user.likes[beerReviewId];
      if(bool === undefined) {
        bool = false;
      }
      if(bool === false) {
        user.likes[beerReviewId] = true;
      } else if(bool === true ) {
        user.likes[beerReviewId] = false;
      }
      // console.log(user, "post")
      user.markModified('likes');
      return user.save().then((data) => {
        // console.log(data, ":data")
        if(user.likes[beerReviewId] === true) {
         return handleAddLikes(req);
        } else {
         return handleDeleteLikes(req);
        }
      })
  })

  // console.log(newLikes);
})

//GET route for single user
router.get('/getuser/:id', function(req, res) {
  // console.log(req.params.id);
  helpers.userHelpers.getUser(req.params.id).then((user) => {
    res.send(user);
  })
})

//GET route for all users
router.get('/getusers', function(req, res) {
  helpers.userHelpers.findAll().then((data) => {
    res.send(data);
  })

})


//POST route for adding a beerpicture 
router.post('/addbeerpicture', upload.any(), function(req, res) {
  let file = req.files[0];
  let creds = JSON.parse(req.body.userinfo);
  console.log(creds.creds._id);
  let userFeed = client.feed('user', creds.creds.username );
  // console.log(file, creds);

	// extract params from body and file from uploaded files
	// var data = req.body.image || {},
  //   file = req.files || {};
	// // generate unique filename using uuid and assign to object
	// data.filename = uuid.v4();
  // data['created_at'] = new Date();
  async.waterfall(
    [
        // upload file to amazon s3
        function(cb) {
            // initialize knox client
            var knoxClient = knox.createClient({
              key: config.s3.key,
              secret: config.s3.secret,
              bucket: config.s3.bucket
            });

            // send put via knox
            knoxClient.putFile(
                `${file.path}`,
                'uploads/' + creds.creds._id + ".jpg",
                {
                    'Content-Type': 'jpg',
                    'x-amz-acl': 'public-read',
                    'CacheControl': "no-cache"
                },
                function(err, result) {
                  // console.log(result);

                    if (err || result.statusCode != 200) {
                        console.log(err);
                    } else {
                        res.send(200);
                    }
                },
            );
        }
      ]
    )
})

//POST route for adding a profile picture



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
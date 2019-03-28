const router = require('express').Router();
const helpers = require('../controllers/reducerController');


//GET route to get all articles for user
router.get('/', function (req, res) {
  helpers.articleHelpers.grabAll()
    .then((articles) => {
      res.send(articles);
    })
})

//GET route for single article for user
router.get('/:id', function (req, res) {
  helpers.articleHelpers.grabOne(req.params.id)
    .then((article) => {
      // console.log(article);
      res.send(article);
    })

})

//POST route to add article for admin
router.post('/addarticle', function (req, res) {
  //   helpers.articleHelpers.save({image: {source:'https://cdn.beeradvocate.com/assets/uploads/2018/03/TeaBeer1-820x564.jpg', size: "huge"},
  //   title: "Are Tea Beers cool?",
  //   caption: 'Kindred Spirits by Rob Bagley',
  //   content: 'The four other ingredients in Chesapeake & Maine’s light, tart, and citrus-forward Sea Mule cocktail serve to accentuate the prominent flavors of Dogfish Head’s sessionable SeaQuench Ale.'
  // });
  res.sendStatus(202);
})

module.exports = router;
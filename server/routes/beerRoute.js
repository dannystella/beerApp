const router = require('express').Router();
const helpers = require('../controllers/reducerController');


//GET router to get all beers in DB for users
router.get('/', function(req, res) {
  helpers.beerHelpers.grabAll()
  .then((beers) => {
      // console.log(beers);
    res.send(beers);
  })
})

//GET router for single beer for beer detail
router.get('/:id', function(req, res) {
  helpers.beerHelpers.grabOne(req.params.id)
  .then((beer) => {
      console.log(beer);
    res.send(beer);
  })

})

//DELETE route for deleting a beer for admin
router.delete('/:id', function(req, res) {
  helpers.beerHelpers.delete(req.params.id)
  .then((data) => {
      console.log(data);
  })
})

//POST route to add beers for admin
router.post('/addbeers', function(req, res) {
  helpers.beerHelpers.save(req.body);
  res.sendStatus(202);
})



module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const helpers = require('./modelControllers');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());



app.post('/addbeers', function(req, res) {
  helpers.beerHelpers.save(req.body);
  res.sendStatus(202);
})

app.get('/beers', function(req, res) {
  helpers.beerHelpers.grabAll()
  .then((beers) => {
      // console.log(beers);
    res.send(beers);
  })

})

app.get('/beers/:id', function(req, res) {
  helpers.beerHelpers.grabOne(req.params.id)
  .then((beer) => {
      console.log(beer);
    res.send(beer);
  })

})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});
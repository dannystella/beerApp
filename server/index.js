const express = require('express');
const mongoose = require('mongoose');
const dataBaseCreds = require('./creds.js');
const dbUser = dataBaseCreds.dbUser;
const dbPassword = dataBaseCreds.dbPassword;
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const app = express();
const beerRoute = require('./routes/beerRoute');
const articleRoute = require('./routes/articleRoute');
const userRoute = require('./routes/userRoute');
var RateLimit = require('express-rate-limit');

var likeLimiter1 = new RateLimit({
  windowMs: .01 * 60 * 1000,
  max: 1,
  delayAfter: 1, // begin slowing down responses after the first request
  delayMs: 15 * 1000, // slow down subsequent responses by 3 seconds per request
  message: "Too many requests"
});

var likeLimiter2 = new RateLimit({
  windowMs: .1 * 60 * 1000,
  max: 3,
  delayAfter: 1,
  delayMs: 10 * 5000,
  message: "Too many requests"
});

app.use('/users/likes', likeLimiter1);


mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds253889.mlab.com:53889/beeroiseur`);

app.use(express.static(__dirname + '/../client/dist'));
// app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use('/beers', beerRoute);
app.use('/articles', articleRoute);
app.use('/users', userRoute);

app.listen(3000, function () {
  console.log('listening on port 3000!');
});



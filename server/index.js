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


mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds253889.mlab.com:53889/beeroiseur`);

app.use(express.static(__dirname + '/../client/dist'));
// app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/beers', beerRoute);
app.use('/articles', articleRoute);
app.use('/users', userRoute);

app.listen(3000, function() {
  console.log('listening on port 3000!');
});



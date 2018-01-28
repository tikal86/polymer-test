var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Log all requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(__dirname + '/build/es6-unbundled')); 

// Parse request body into req.body.*
app.use(urlencodedParser);

app.use(require('./route'));

// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');
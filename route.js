var http    = require( "http" );
var express = require('express');
var Cookies = require( "cookies");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = module.exports = express.Router();

app.get('/api/sweeping', function(req, res) {
  var cookie = new Cookies( req, res);
  res.setHeader('access-token', 'moeilijkestring');
  res.setHeader('SetCookie', '{\'xsrf\', \'moeilijkestring\'}');
  const transactions = [{test:'test'}];
  cookie.set( 'xsrf', 'moeilijkestring', { httpOnly: false } );
  res.status(200).json(transactions);
  console.log('completed');
});


app.post('/api/sweeping', function(req, res) {
  console.log('post received');
  // var searchText = req.body.searchText;
  // res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
  const transactions = [{test:'test'}];
  res.status(200).json(transactions);
  console.log('completed');
});

// Route for specific URLs
app.get('/books', function(req, res){
  res.send('A list of books goes here');
});

// A specific book by ID
app.get('/books/:id', function(req, res){
  var html = "<p>You requested book <b>" + req.params.id + "</b>.</p>"
  res.send(html);
});

// Search form (GET)
app.get("/search", function(req, res) {
  var cookies = new Cookies( req, res);
  cookies.set( 'xsrf', 'moeilijkestring', { httpOnly: false, path: '/api/sweeping' } );
  var html = '<p>' + 
    '<form id="search" method="post" action="/api/sweeping">' + 
    '  Enter something: ' +
    '  <input type="text" name="searchText"/>' +
    '  <input type="submit"/>' + 
    '</form>' + 
    '</p>';
  res.send(html)
});

// Search form (POST)
app.post("/api/sweeping-oud", urlencodedParser, function(req, res) {
  var searchText = req.body.searchText;
  res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
});


// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});


var logger = require('morgan'),
  cors = require('cors'),
  http = require('http'),
  express = require('express'),
  errorhandler = require('errorhandler'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser');

var session = require('express-session');
var csrf = require('csurf');
var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.set('port', 8081);
app.use(express.static(__dirname + '/build/es6-unbundled'));

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.use(require('./route'));

// app.use(session({
//   secret: 'My super session secret',
//   cookie: {
//     httpOnly: false,
//     secure: true
//   }
// }));

// app.use(csrf());

// app.use(function(req, res, next) {
//   res.locals._csrf = req.csrfToken();
//   next();
// });

var port = process.env.PORT || 8081;

// http.createServer(app).listen(port, function(err) {
//   console.log('listening in http://localhost:' + port);
// });

app.listen(port)
console.log('listening on http://localhost:' + port)
module.exports = app

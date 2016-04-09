var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/users');
//var authRoutes = require('./indexRoutes/auth');

//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  rolling: true,
  resave: false,
  saveUninitialized: false,
  secret: 'timeTO0fish'
}));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication
/*
passport.use(
    new LocalStrategy(
        function (username, password, done) {
          // Find user, return done(null, user) or done(err) on failure
          // done(null, false) is an appropriate failure (not authenticated)
          return done(null, false);
        }));
app.use(passport.initialize());
app.use(passport.session());
*/

// Main Page
app.use('/', indexRoutes);


// API
//app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * error handlers
 */

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

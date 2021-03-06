'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var middleware = require('swagger-express-middleware');

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/users');
var authRoutes = require('./routes/auth');
var permissionRoutes = require('./routes/permissions');
var roleRoutes = require('./routes/roles');

var userController = require('./api/controllers/user.server.controller');

var passport = require('passport');
var localStrategy = require('./config/strategies/local');

var app = express();

module.exports = app;

// setup swagger
middleware('./api/swagger/swagger.yaml', function(err, middleware){
  if(err)
    throw err;

  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock()
  );

  console.log('swagger express middleware established.');
});

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
passport.use(localStrategy());

app.use(passport.initialize());
app.use(passport.session());

app.use(userController.setSessionUser);

// API
app.use('/api/authenticate', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/roles', roleRoutes);

// Main Page
app.use('/', indexRoutes);

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

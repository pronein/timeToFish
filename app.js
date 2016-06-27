'use strict';

var express = require('express');
var app = express();

module.exports = app;

if (app.get('env') === 'swagger') {
  var SwaggerExpress = require('swagger-express-mw');

  // setup swagger
  var swaggerConfig = {
    appRoot: __dirname
  };

  SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
    if (err) {
      throw err;
    }

    app.all('/api/*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      next();
    });

    swaggerExpress.register(app);

    require('debug')('timeToFish:swagger')('Swagger express registered.');
  });
} else {
  var path = require('path');
  var favicon = require('serve-favicon');
  var morgan = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var debug = require('debug')('timeToFish:router');

  var indexRoutes = require('./routes/index');
  var userRoutes = require('./routes/users');
  var authRoutes = require('./routes/auth');
  var permissionRoutes = require('./routes/permissions');
  var roleRoutes = require('./routes/roles');
  var menusRoutes = require('./routes/menus.routes');

  var userController = require('./api/controllers/user.server.controller');

  var passport = require('passport');
  var localStrategy = require('./config/strategies/local');

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
  app.use('/api/menus', menusRoutes);

  // Main Page
  app.use('/*', indexRoutes);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /*
   * error handlers
   */

  if (app.get('env') === 'development') {
    // development error handler will print stacktrace
    app.use(function (err, req, res, next) {
      err.showError = true;

      next(err);
    });
  } else {
    // production error handler no stacktraces leaked to user
    app.use(function (err, req, res, next) {
      err.showError = false;

      next(err);
    });
  }

  app.use(function(err, req, res) {
    debug('Route was not handled: ' + req.url);

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err.showError ? err : {}
    });
  });
}
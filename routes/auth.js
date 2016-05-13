var express = require('express');
var passport = require('passport');
var log = require('../auxiliary/logger');
var User = require('mongoose').model('User');

var router = express.Router();

module.exports = router;

router.post('/', function (req, res, next) {
  var session = req.session;

  if (session.passport && session.passport.user) {
    User.findById(session.passport.user, function (err, user) {
      if(err) tryAuthenticate(req, res, next);
      else signIn(req, res, user, next);
    });
  } else {
    tryAuthenticate(req, res, next);
  }
});

router.post('/release', function (req, res, next) {
  req.logOut(); //leaves req.session.passport, but drops passport.user
  res.sendStatus(200);
});

function signIn(req, res, user, next){
  req.logIn(user, function (err) {
    if (err) {
      return next(err);
    }

    return res.status(200).send(user);
  });
}

function tryAuthenticate(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      log.error({err: err}, 'Error during authentication.');

      return next(err);
    }

    if (!user) {
      return res.sendStatus(401);
    }

    signIn(req, res, user, next);
  })(req, res, next);
}

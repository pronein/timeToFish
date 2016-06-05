var passport = require('passport');
var log = require('../auxiliary/logger');
var User = require('mongoose').model('User');

module.exports = {
  authenticateUser: _authenticate,
  disavowUser: _disavow
};

function _authenticate(req, res, next) {
  var userId =
    req.session &&
    req.session.passport &&
    req.session.passport.user;

  if (userId) {
    User.findById(userId, function (err, user) {
      if (err) _tryAuthenticate(req, res, next);
      else _trySignIn(req, res, user, next);
    });
  } else if (req.body.requestIsFromUser)
    _tryAuthenticate(req, res, next);
}

function _disavow(req, res, next) {
  req.logOut(); //leaves req.session.passport intact, but drops req.session.passport.user

  res.sendStatus(200);
}

function _trySignIn(req, res, user, next) {
  req.logIn(user, function (err) {
    if (err)
      return next(err);

    return res.status(200).send(user);
  });
}

function _tryAuthenticate(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      log.error({err: err}, 'Error during authentication.');

      return next(err);
    }

    if (!user)
      return res.sendStatus(401); //<-- This is likely where the 401's client side are coming from, we don't want these for auto-login attempts, only user attempts to login

    _trySignIn(req, res, user, next);
  })(req, res, next);
}

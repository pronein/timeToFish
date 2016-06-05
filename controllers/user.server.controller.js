var mongoose = require('mongoose');
var User = mongoose.model('User');

var log = require('../auxiliary/logger');

module.exports = {
  create: createUser,
  setSessionUser: setSessionUser,
  validateUsername: validateUsernameIsAvailable
};

function createUser(req, res, next) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) {
      log.error({err: err}, 'Error during creation of user.');

      res.status(500).json({msg: 'Failed to create new user.'});
    }
    else {
      res.send(user);
    }
  });
}

function setSessionUser(req, res, next) {
  var session = req.session;

  if (session && session.passport && session.passport.user) {
    User.findById(session.passport.user, function (err, user) {
      if (!err) {
        req.user = user;
      }

      next();
    });
  } else {
    next();
  }
}

function validateUsernameIsAvailable(req, res, next) {
  User.usernameExists(req.body.username, function (err, exists) {
    if (err) {
      log.error({err: err}, 'Error trying to validate username is available.');

      res.status(500).json({msg: err.msg});
    } else
      res.send(!exists);
  });
}
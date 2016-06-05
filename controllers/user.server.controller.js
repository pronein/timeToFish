var mongoose = require('mongoose');
var User = mongoose.model('User');

var log = require('../auxiliary/logger');
var hasher = require('../auxiliary/hasher');

module.exports = {
  create: createUser,
  setSessionUser: setSessionUser,
  validateUsername: validateUsernameIsAvailable
};

function createUser(req, res, next) {
  var user = new User(req.body),
    generatedSalt = hasher.generateSalt(),
    generatedHash = hasher.generateHash(req.body.password, generatedSalt);

  user.password = {
    salt: generatedSalt,
    hash: generatedHash
  };

  user.save(function (err) {
    if (err) {
      log.error({err: err}, 'Error during creation of user.');

      res.status(500).json({msg: 'Failed to create new user.'});
    } else {
      req.login(user, function (err) {
        if (err)
          return next(err);

        return res.status(201).send(user);
      });
    }
  });
}

function setSessionUser(req, res, next) {
  var userId =
    req.session &&
    req.session.passport &&
    req.session.passport.user;

  if (userId)
    User.findById(userId, function (err, user) {
      if (!err)
        req.user = user;

      next();
    });
  else
    next();
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
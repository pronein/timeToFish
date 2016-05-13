var mongoose = require('mongoose');
var User = mongoose.model('User');

var log = require('../auxiliary/logger');

module.exports = {
  create: createUser,
  setSessionUser: setSessionUser
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
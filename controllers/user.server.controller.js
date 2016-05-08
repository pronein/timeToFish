var User = require('mongoose').model('User');
var log = require('../auxiliary/logger');
var passport = require('passport');

module.exports = {
  create: createUser,
  getCurrent: getCurrentUser
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

function getCurrentUser(req, res, next) {
  var session = req.session;

  if(!session || !session.passport || !session.passport.user) {
    res.sendStatus(204);
  }

  User.findById(session.passport.user, function(err, user) {
    if (err) {
      res.sendStatus(204);
    }

    res.status(200).send(user);
  });
}
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
var log = require('../../auxiliary/logger');
var hasher = require('../../auxiliary/hasher');

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  return new LocalStrategy(
      function (username, password, done) {
        User.findOne({
          $or: [{username: username}, {email: username}]
        }, function (err, user) {
          if (err) {
            log.error({err: err}, 'Error while trying to find the user for authentication');
            return done(err);
          }

          if (!user) {
            log.debug('User does not exist [' + username + ']');
            return done(null, false);
          }

          if (validateUser(user, password))
            done(null, user);
          else {
            log.debug('Could not validate user [' + username + ']');
            done(null, false);
          }
        });
      });
};

function validateUser(user, password) {
  var hash = hasher.hash(password);
  return user !== null && hash === user.passwordHash;
}
